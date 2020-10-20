import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { UsuarioService } from './usuario.service';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class CapitulosService {

  constructor(
    private apiCtrl: ApiService,
    private usuarioCtrl: UsuarioService,
    private utilsCtrl: UtilsService,
  ) { }

  async getRegioes() {
    try {
      const regioes = await this.apiCtrl.get('admin/regioes')

      return regioes
    } catch (error) {
      throw error
    }
  }

  async getCapitulos(options: { ofex, termoBusca, offset, }) {
    try {
      const url = `capitulos?ofex=${options.ofex}&termoBusca=${options.termoBusca}&offset=${options.offset}`
      const capitulos = await this.apiCtrl.get(url)

      return capitulos
    } catch (error) {
      throw error
    }
  }
}
