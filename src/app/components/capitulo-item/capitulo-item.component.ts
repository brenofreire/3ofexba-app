import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { AlertController } from '@ionic/angular'
import { CapitulosService } from 'src/app/services/capitulos.service'
import { UtilsService } from 'src/app/services/utils.service'

@Component({
  selector: 'app-capitulo-item',
  templateUrl: './capitulo-item.component.html',
  styleUrls: ['./capitulo-item.component.scss'],
})
export class CapituloItemComponent implements OnInit {
  @Input() capitulo = {
    nome: '',
    sigla: '',
    numero: '',
  }

  @Output() deleteMe = new EventEmitter()

  constructor(private capituloCtrl: CapitulosService, private utilsCtrl: UtilsService, private alertCtrl: AlertController) {}

  ngOnInit() {}

  async deleteCapitulo($event: MouseEvent) {
    $event.stopPropagation()

    await this.mostraAlertaDeDeletar()
  }

  async mostraAlertaDeDeletar() {
    const alertDelete = await this.alertCtrl.create({
      message: 'Você tem certeza que deseja deletar este capítulo?',
      subHeader: 'Essa ação não poderá ser desfeita',
      buttons: [
        'Cancelar',
        {
          text: 'Deletar',
          handler: () => this.performsDeleteCapitulo(),
        },
      ],
    })

    alertDelete.present()
  }

  async performsDeleteCapitulo() {
    try {
      await this.capituloCtrl.deleteCapitulo(this.capitulo)

      this.utilsCtrl.mostrarToast('Ação realizada com sucesso!')

      this.deleteMe.emit()
    } catch (error) {
      this.utilsCtrl.mostrarAlert('Erro ao deletar o capitulo', 'Informe as autoridades do aplicativo')
    }

    return false
  }
}
