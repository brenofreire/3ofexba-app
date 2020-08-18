import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as UsuarioActions from '../NgRx/actions/usuario.action'
import { State, getUsuarioLogado } from '../NgRx/reducers'
import { ApiService } from './api.service';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

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
    } catch ({error}) {
      throw error
    }
  }

  public async cadastro(options: { username, password }) {
    try {
      await this.apiCtrl.post('cadastro', options)
    } catch ({error}) {
      throw error
    }
  }

  public async salvarInformacoesUsuarioStorage (options: { usuario, token }) {
    await this.storage.set('usuario', options.usuario)
    await this.storage.set('token', options.token)
    this.setUsuarioLogado(options.usuario)
  }

  public getHomeRoute (role: 'comun' | 'regional' | 'admin') {
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

  public async removerInformacoesUsuarioStorage () {
    await this.storage.clear()
    this.setUsuarioLogado(null)
  }
}
