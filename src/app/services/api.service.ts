import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Storage } from '@ionic/storage'

import { CURRENT_URL_API } from './config/api.config'

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private JWTRefreshedToken = 'jwt_expired_token_refreshed'

  constructor(
    private http: HttpClient, 
    private storage: Storage,
  ) {}

  async relogar(novoToken) {
    await this.storage.set('usuario-token', novoToken)
  }

  async post(url: string, body: object, token?): Promise<any> {
    return new Promise(async (response, error) => {
      const headersOptions = await this.montarHeader('post', token)

      this.http.post(CURRENT_URL_API + url, body, { headers: headersOptions })
        .subscribe(result => { response(result) },
        async (err) => {
          if (err && err.error && this.JWTRefreshedToken == err.error.mensagem) {
            await this.relogar(err.error.token)
            response(await this.post(url, body, err.error.token))
          } else {
            error(err)
          }
        }
      )
    })
  }

  async get(url, token?): Promise<any> {
    const headerOptions = await this.montarHeader('get', token)

    return new Promise(async (response, error) => {
      this.http.get(CURRENT_URL_API + url, { headers: headerOptions })
        .subscribe(result => response(result),
        async (err) => {
          if (err && err.error && this.JWTRefreshedToken == err.error.mensagem) {
            await this.relogar(err.error.token)
            response(await this.get(url, err.error.token))
          } else {
            error(err)
          }
        }
      )
    })
  }

  async montarHeader(tipoRequest, tokenNovo?) {
    const token = tokenNovo || await this.storage.get('seumenu-token')
    const tokenFormatado = `Bearer ${token}`

    const headersOptions = {
      'Content-Type': 'application/json',
      Authorization: tokenFormatado,
    }

    if (!token) delete headersOptions['Authorization']
    if (tipoRequest === 'get' || tipoRequest == 'delete') delete headersOptions['Content-Type']

    return new HttpHeaders(headersOptions)
  }
}
