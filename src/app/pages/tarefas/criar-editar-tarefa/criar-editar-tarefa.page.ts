import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TarefasService } from 'src/app/services/tarefas.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-criar-editar-tarefa',
  templateUrl: './criar-editar-tarefa.page.html',
  styleUrls: ['./criar-editar-tarefa.page.scss'],
})
export class CriarEditarTarefaPage implements OnInit {
  public campanhas: any[]
  public termoBusca: string
  public carregando: boolean

  constructor(
    private tarefasCtrl: TarefasService,
    private utilsCtrl: UtilsService,
    private modalCtrl: ModalController,
  ) { }

  async ngOnInit() {
    await this.inicializaPagina()
  }

  async inicializaPagina() {
    this.carregando = true
    try {
      this.campanhas = await this.tarefasCtrl.getCampanhasAdmin({
        offset: this.campanhas && this.campanhas.length || 0,
        termoBusca: this.termoBusca || ''
      })

      console.log(this.campanhas)
    } catch (error) {
      await this.utilsCtrl.mostrarAlert(
        'Ops... houve um erro', 'Tente listar campanhas novamente mais tarde'
      )
    } finally {
      this.carregando = false
    }
  }

  async dismiss() {
    await this.modalCtrl.dismiss()
  }
}
