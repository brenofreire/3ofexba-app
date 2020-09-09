import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApiService } from './api.service';
import { State } from '../NgRx/reducers'
import { ActionSheetController, AlertController } from '@ionic/angular';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class TarefasService {
  private tarefa: any
  private usuario: any

  constructor(
    private store: Store<State>,
    public apiCtrl: ApiService,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    public usuarioCtrl: UsuarioService,
  ) { 
    this.usuarioCtrl.getUsuariologadoObservable().subscribe(item => {
      this.usuario = item
    })
  }

  public async getResumoCampanhas(options?: { capitulo }) {
    try {
      const campanhas = await this.apiCtrl.get(`campanhas?capitulo=${options.capitulo}`)

      return campanhas
    } catch ({error}) {
      throw error
    }
  }

  public async getTarefas(options?: { nomeTarefa }) {
    try {
      const tarefas = await this.apiCtrl.get(`campanhas/${options.nomeTarefa}`)

      return tarefas
    } catch ({error}) {
      throw error
    }
  }

  public async actionSheetStatusTarefa(options: { tarefa }) {
    const actionSheetStatus = await this.actionSheetCtrl.create({
      header: 'O que deseja fazer?',
      buttons: [{
        text: 'Mudar status da atividade',
        handler: async () => {
          this.tarefa = options.tarefa

          await this.alertMudarStatus({ tarefa: this.tarefa })
        }
      }, {
        text: 'Pedir ajuda sobre atividade',
        handler: () => {
          console.log('>>> Abrir zap')
        }
      }, {
        text: 'Cancelar',
        role: 'cancel'
      }]
    })

    return await actionSheetStatus.present()
  }

  public async alertMudarStatus(options: { tarefa: any; }) {
    const alertMudarStatus = await this.alertCtrl.create({
      header: 'Mudar status da atividade',
      subHeader: 'O campo marcado, mostra o status da atividade atualmente',
      message: 'Somente admins poderão mudar o status da atividade para devolvida, recusada ou aprovada',
      inputs: [{
        type: 'radio',
        label: 'Atividade não formulada',
        value: 0,
        checked: this.tarefa.statusCapitulo === 0,
        handler: async (data) => await alertMudarStatus.dismiss(data)
      },{
        type: 'radio',
        label: 'Atividade realizada',
        value: 1,
        checked: this.tarefa.statusCapitulo === 1,
        handler: async (data) => await alertMudarStatus.dismiss(data)
      },{
        type: 'radio',
        label: 'Atividade enviada',
        value: 2,
        checked: this.tarefa.statusCapitulo === 2,
        handler: async (data) => await alertMudarStatus.dismiss(data)
      },{
        type: 'radio',
        label: 'Atividade devolvida',
        value: 3,
        checked: this.tarefa.statusCapitulo === 3,
        disabled: this.usuario.role !== 'admin',
        handler: async (data) => await alertMudarStatus.dismiss(data)
      },{
        type: 'radio',
        label: 'Atividade recusada',
        value: 4,
        checked: this.tarefa.statusCapitulo === 4,
        disabled: this.usuario.role !== 'admin',
        handler: async (data) => await alertMudarStatus.dismiss(data)
      },{
        type: 'radio',
        label: 'Atividade concluida',
        value: 5,
        checked: this.tarefa.statusCapitulo === 5,
        disabled: this.usuario.role !== 'admin',
        handler: async (data) => await alertMudarStatus.dismiss(data)
      },]
    })

    await alertMudarStatus.present()

    const { data } = await alertMudarStatus.onDidDismiss()

    if(data) {
      options.tarefa.status = data.value

      await this.mudarStatus(options)
    }

    return 
  }

  public async mudarStatus(option: { tarefa }) {
    try {
      console.log('Tá na boca da butija');
    } catch (error) {
      
    }
  }
}
