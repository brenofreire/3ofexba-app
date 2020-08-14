import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApiService } from './api.service';
import { State } from '../NgRx/reducers'

@Injectable({
  providedIn: 'root'
})
export class TarefasService {

  constructor(
    private store: Store<State>,
    public apiCtrl: ApiService,
  ) { }

  public async getResumoCampanhas(options?: { capitulo }) {
    try {
      const campanhas = await this.apiCtrl.get(`campanhas?capitulo=${options.capitulo}`)

      return campanhas
    } catch ({error}) {
      throw error
    }
  }
}
