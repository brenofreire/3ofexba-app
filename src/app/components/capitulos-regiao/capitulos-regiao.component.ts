import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CapituloSinglePage } from 'src/app/pages/capitulo-single/capitulo-single.page';

@Component({
  selector: 'app-capitulos-regiao',
  templateUrl: './capitulos-regiao.component.html',
  styleUrls: ['./capitulos-regiao.component.scss'],
})
export class CapitulosRegiaoComponent implements OnInit {
  @Input('capitulosDaRegiao') capitulosDaRegiao

  constructor(
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {}


  async abrirCapituloDetalhado(capitulo) {

    const modalCapituloDetalhado = await this.modalCtrl.create({
      component: CapituloSinglePage,
      componentProps: { capitulo }
    })

    await modalCapituloDetalhado.present()
  }
}
