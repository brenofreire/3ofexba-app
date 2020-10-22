import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TarefasService } from 'src/app/services/tarefas.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-editar-criar-tarefa',
  templateUrl: './editar-criar-tarefa.page.html',
  styleUrls: ['./editar-criar-tarefa.page.scss'],
})
export class EditarCriarTarefaPage implements OnInit {
  @Input('tarefa') tarefa
  public tiposCampanha: any[]
  public modificouAtividade: boolean = false

  constructor(
    private tarefasCtrl: TarefasService,
    private utilsCtrl: UtilsService,
    private modalCtrl: ModalController,
  ) { }

  async ngOnInit() {
    this.tiposCampanha = await this.tarefasCtrl.getCampanhasTipo()
  }

  objectKeys(obj) {
    return Object.keys(obj)
  }

  async criarEditarTarefa() {
    const loader = await this.utilsCtrl.mostrarLoader('Salvando informações...')
    await loader.present()

    try {
      await this.tarefasCtrl.editarCriarTarefa(this.tarefa)

      await this.utilsCtrl.mostrarAlert(
        `Atividade ${this.tarefa.id ? 'editada' : 'criada'} com sucesso!`, ''
      )

      this.modificouAtividade = true
    } catch (error) {
      const erroMensagem = error && error.mensagem ? error.mensagem 
      : `Houve um erro inesperado ao ${this.tarefa.id ? 'editar' : 'criar'} atividade`

      await this.utilsCtrl.mostrarAlert(erroMensagem, 'Tente novamente mais tarde')
    } finally {
      await loader.dismiss()
    }
  }

  async dismiss() {
    await this.modalCtrl.dismiss(this.modificouAtividade)
  }
}
