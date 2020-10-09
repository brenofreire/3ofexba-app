import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AgostinhoService {

  constructor(
    private apiCtrl: ApiService,
  ) { }

  async getMensagensAgostinho(options: { offset }) {
    try {
      const mensagens = await this.apiCtrl.get(`agostinho?offset=${options.offset}`)

      return mensagens
    } catch (error) {
      throw error
    }
  }
}
