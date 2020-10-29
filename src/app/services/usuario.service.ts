import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as UsuarioActions from '../NgRx/actions/usuario.action'
import { State, getUsuarioLogado } from '../NgRx/reducers'
import { ApiService } from './api.service';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
export const cargosEnum = {
  mc: 'Mestre Conselheiro',
  esc: 'Escrivão',
  tes: 'Tesoureiro',
  hos: 'Hospitaleiro',
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(
    private store: Store<State>,
    private apiCtrl: ApiService,
    private storage: Storage,
    private alertCtrl: AlertController,
    private routerCtrl: Router,
  ) { }

  public getUsuariologadoObservable(): Observable<any> {
    return this.store.select(getUsuarioLogado)
  }

  public setUsuarioLogado(usuario) {
    this.store.dispatch(new UsuarioActions.UsuarioLogado(usuario))
  }

  public async login(options: { username, password }) {
    try {
      const info = await this.apiCtrl.post('login', options)
      await this.salvarInformacoesUsuarioStorage(info)

      return info.usuario
    } catch ({ error }) {
      throw error
    }
  }

  public async cadastro(options: { username, password }) {
    try {
      await this.apiCtrl.post('cadastro', options)
    } catch ({ error }) {
      throw error
    }
  }

  public async salvarInformacoesUsuarioStorage(options: { usuario, token }) {
    await this.storage.set('usuario', options.usuario)
    await this.storage.set('usuario-token', options.token)
    this.setUsuarioLogado(options.usuario)
  }

  public getHomeRoute(role: 'comun' | 'regional' | 'admin') {
    const rotasUsuarios = {
      comum: 'home',
      regional: 'home-regional',
      admin: 'home-admin',
    }

    return rotasUsuarios[role]
  }

  public async logout() {
    const logoutAlert = await this.alertCtrl.create({
      header: 'Você está prestes sair da conta',
      subHeader: 'Tem certeza disso?',
      buttons: ['Cancelar', {
        text: 'Sair da conta',
        handler: async () => {
          await this.removerInformacoesUsuarioStorage()
          await this.routerCtrl.navigateByUrl('')
        }
      }
      ]
    })

    return await logoutAlert.present()
  }

  public async removerInformacoesUsuarioStorage() {
    await this.storage.clear()
    this.setUsuarioLogado(null)
  }

  public toMeuCargo(options: { usuarioLogado }) {
    const cargos = cargosEnum

    return cargos[options.usuarioLogado.cargo]
  }

  public async getUsuariosAdmin(options: { termoBusca, offset, filtroStatusUsuario }) {
    try {
      let url = `admin/usuarios?offset=${options.offset}`
      url += `&termoBusca=${options.termoBusca}`
      url += `&filtroStatus=${options.filtroStatusUsuario}`
      
      const usuarios = await this.apiCtrl.get(url)

      return usuarios
    } catch ({ error }) {
      throw error
    }
  }

  async editarCadastroUsuario(usuario) {
    try {
      const usuarioEditado = await this.apiCtrl.post('admin/usuarios', usuario)

      return usuarioEditado
    } catch ({ error }) {
      console.log(error)

      throw error
    }
  }
}
