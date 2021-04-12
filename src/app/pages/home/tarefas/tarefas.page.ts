import { Component, OnInit } from '@angular/core'
import { TarefasService } from 'src/app/services/tarefas.service'
import { ModalController, NavParams } from '@ionic/angular'

@Component({
  selector: 'app-tarefas',
  templateUrl: './tarefas.page.html',
  styleUrls: ['./tarefas.page.scss'],
})
export class TarefasPage implements OnInit {
  public carregandoTarefas: boolean = true
  public slugTarefa: string
  public tituloTarefa: any
  public tarefas: any
  public idCapitulo: any

  constructor(private tarefasCtrl: TarefasService, private modalCtrl: ModalController, private navParams: NavParams) {}

  async ngOnInit() {
    this.slugTarefa = this.navParams.get('slugTarefa')
    this.idCapitulo = this.navParams.get('idCapitulo')

    await this.getTarefas()
  }

  async getTarefas() {
    this.carregandoTarefas = true
    try {
      const { tarefas, tituloTarefa } = await this.tarefasCtrl.getTarefas({
        nomeTarefa: this.slugTarefa,
        idCapitulo: this.idCapitulo,
      })

      this.tituloTarefa = tituloTarefa
      this.tarefas = tarefas
    } catch (error) {
      console.log(error)
    } finally {
      this.carregandoTarefas = false
    }
  }

  async dismiss() {
    await this.modalCtrl.dismiss()
  }
}
