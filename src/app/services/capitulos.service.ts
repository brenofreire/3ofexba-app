import { Injectable } from '@angular/core'
import { ApiService } from './api.service'
import { UsuarioService } from './usuario.service'
import { UtilsService } from './utils.service'

@Injectable({
  providedIn: 'root',
})
export class CapitulosService {
  constructor(private apiCtrl: ApiService, private usuarioCtrl: UsuarioService, private utilsCtrl: UtilsService) {}

  async getRegioes() {
    try {
      const regioes = await this.apiCtrl.get('admin/regioes')

      return regioes
    } catch (error) {
      throw error
    }
  }

  async getCapitulos(options: { ofex; termoBusca; offset }) {
    try {
      const url = `capitulos?ofex=${options.ofex}&termoBusca=${options.termoBusca}&offset=${options.offset}`
      const capitulos = await this.apiCtrl.get(url)

      return capitulos
    } catch (error) {
      throw error
    }
  }

  async adicionarOuEditarOrganizacao(capitulo) {
    try {
      const capitulos = await this.apiCtrl.post('capitulos', capitulo)

      return capitulos
    } catch (error) {
      throw error
    }
  }

  async getCapitulosAdmin({ termoBusca }) {
    try {
      const organizacoes = await this.apiCtrl.post('capitulos/todos', { termoBusca })

      return organizacoes
    } catch (error) {
      throw error
    }
  }

  async deleteCapitulo(capitulo) {
    try {
      const organizacoes = await this.apiCtrl.post('capitulos/deletar', { capitulo })

      return organizacoes
    } catch (error) {
      throw error
    }
  }
}
