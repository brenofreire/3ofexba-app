import { Injectable } from '@angular/core'
import * as io from 'socket.io-client'
import { Storage } from '@ionic/storage'
import { CURRENT_URL_API } from './config/api.config'

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private token: string
  public socket: any

  constructor(
    private storage: Storage,
  ) { }

  async conectarSocket() {
    this.token = await this.storage.get('usuario-token')

    if (this.token) {

      if (this.socket) this.socket.disconnect()

      this.socket = io.connect(CURRENT_URL_API, {
        query: `token=${this.token}`,
        reconnect: true,
      })

      this.socket.on('connect', () => {
        console.log('conectado')
      })

      this.socket.on('reconnecting', () => {
        console.log('reconectando')
      })

      this.socket.on('reconnect', (timeout) => {
        console.log('reconectado')
      })

      this.socket.on('disconnect', () => {
        console.log('desconectado')
      })
    }
  }

  emitirEvento(evento: string, payload: object) {
    return new Promise((resolve, reject) => {
      this.socket.emit(evento, payload, (callback) => {
        if (callback.erro) reject(callback.erro)
        else resolve(callback)
      })
    })
  }

}
