import { Component, OnInit, Input } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ModalController } from '@ionic/angular';
import { TarefasPage } from 'src/app/pages/home/tarefas/tarefas.page';

@Component({
  selector: 'app-campanha-item',
  templateUrl: './campanha-item.component.html',
  styleUrls: ['./campanha-item.component.scss'],
})
export class CampanhaItemComponent implements OnInit {
  @Input('campanha') campanha
  public usuarioLogado
  public isAdmin = false

  constructor(
    private usuarioCtrl: UsuarioService,
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
    this.usuarioCtrl.getUsuariologadoObservable().subscribe(item => {
      this.usuarioLogado = item
      this.isAdmin = this.usuarioLogado.role === 'admin'
    })
  }

  toWidth(num, den) {
    const porcentagem = Math.ceil((num / den) * 100)
    const borderRadius = porcentagem >= 100 ? 'border-radius: 8px' : 'border-radius: 8px 0px 0px 8px';

    return `width: ${porcentagem.toFixed(0)}%; ${borderRadius};`
  }

  toMinhaCampanha() {
    if (
      this.campanha.cargoTarefa &&
      this.campanha.cargoTarefa.includes(this.usuarioLogado.cargo)
    ) {
      return true
    }
  }

  async abrirCamapnha() {
    const modalCampanha = await this.modalCtrl.create({
      component: TarefasPage,
      componentProps: {
        slugTarefa: this.campanha.slug,
        idCapitulo: this.campanha.idCapitulo,
      }
    })

    setTimeout(async () => {
      await modalCampanha.present()
    }, 200)
  }
}
