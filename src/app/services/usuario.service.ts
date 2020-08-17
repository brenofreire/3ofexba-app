import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as UsuarioActions from '../NgRx/actions/usuario.action'
import { State, getUsuarioLogado } from '../NgRx/reducers'
import { ApiService } from './api.service';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private store: Store<State>,
    public apiCtrl: ApiService,
    public storage: Storage,
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
}
