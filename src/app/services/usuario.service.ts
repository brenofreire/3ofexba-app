import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as UsuarioActions from '../NgRx/actions/usuario.action'
import { State, getUsuarioLogado } from '../NgRx/reducers'
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private store: Store<State>,
    public apiCtrl: ApiService,
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

      console.log(info)      
    } catch (error) {
      throw error
    }
  }
}
