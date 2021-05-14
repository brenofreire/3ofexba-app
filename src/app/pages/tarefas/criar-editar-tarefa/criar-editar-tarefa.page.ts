import { Component, OnInit } from '@angular/core'
import { ModalController } from '@ionic/angular'
import { TarefasService } from 'src/app/services/tarefas.service'
import { cargosEnum } from 'src/app/services/usuario.service'
import { UtilsService } from 'src/app/services/utils.service'
import { EditarCriarTarefaPage } from '../../home-admin/editar-criar-tarefa/editar-criar-tarefa.page'

@Component({
  selector: 'app-criar-editar-tarefa',
  templateUrl: './criar-editar-tarefa.page.html',
  styleUrls: ['./criar-editar-tarefa.page.scss'],
})
export class CriarEditarTarefaPage implements OnInit {
  public campanhas: any[]
  public termoBusca: string
  public carregando: boolean
  public cargosEnum = cargosEnum
  public aindaTemResultadoPraCarregar: boolean

  constructor(private tarefasCtrl: TarefasService, private utilsCtrl: UtilsService, private modalCtrl: ModalController) {}

  async ngOnInit() {
    await this.inicializaPagina()
  }

  async inicializaPagina(recarregarDoZero?) {
    this.carregando = true
    try {
      this.campanhas = await this.tarefasCtrl.getCampanhasAdmin({
        offset: recarregarDoZero ? 0 : (this.campanhas && this.campanhas.length) || 0,
        termoBusca: this.termoBusca || '',
      })

      this.aindaTemResultadoPraCarregar = this.campanhas.length >= 10
    } catch (error) {
      await this.utilsCtrl.mostrarAlert('Ops... houve um erro', 'Tente listar campanhas novamente mais tarde')
    } finally {
      this.carregando = false
    }
  }

  async abrirEditarCriarTarefa(tarefa) {
    const modalEditarCriarTarefa = await this.modalCtrl.create({
      component: EditarCriarTarefaPage,
      componentProps: { tarefa },
    })

    await modalEditarCriarTarefa.present()

    const { data } = await modalEditarCriarTarefa.onDidDismiss()

    if (data) {
      await this.inicializaPagina(true)
    }
  }

  async dismiss() {
    await this.modalCtrl.dismiss()
  }

  async carregarMaisCampanhas(event) {
    event.target.complete()

    this.carregando = true
    try {
      const maisCampanhas: any[] =
        (await this.tarefasCtrl.getCampanhasAdmin({
          offset: this.campanhas.length,
          termoBusca: '',
        })) || []

      this.aindaTemResultadoPraCarregar = maisCampanhas.length >= 10

      this.campanhas.push(...maisCampanhas)
    } catch (error) {
      await this.utilsCtrl.mostrarToast('Ops... houve um erro, Tente listar campanhas novamente mais tarde')
    } finally {
      this.carregando = false
    }
  }
}
