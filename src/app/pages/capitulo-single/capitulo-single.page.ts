import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TarefasService } from 'src/app/services/tarefas.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-capitulo-single',
  templateUrl: './capitulo-single.page.html',
  styleUrls: ['./capitulo-single.page.scss'],
})
export class CapituloSinglePage implements OnInit {
  @Input('capitulo') capitulo
  public campanhas: any[]

  constructor(
    private tarefasCtrl: TarefasService,
    private utilsCtrl: UtilsService,
    private modalCtrl: ModalController,
  ) { }

  async ngOnInit() {
    await this.getResumoCampanhas()
  }

  public async getResumoCampanhas() {
    try {
      this.campanhas = await this.tarefasCtrl.getResumoCampanhas({ capitulo: this.capitulo.numero })
    } catch (error) {
      await this.utilsCtrl.mostrarToast(error)
    }
  }

  public async dismiss() {
    await this.modalCtrl.dismiss()
  }
}
