import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CapitulosService } from 'src/app/services/capitulos.service';
import { UtilsService } from 'src/app/services/utils.service';
import { CapituloSinglePage } from '../../capitulo-single/capitulo-single.page';

@Component({
  selector: 'app-selecionar-regiao',
  templateUrl: './selecionar-regiao.page.html',
  styleUrls: ['./selecionar-regiao.page.scss'],
})
export class SelecionarRegiaoPage implements OnInit {
  public regioes: any[]
  public carregando: boolean
  public regiaoSelecionada
  public capitulosDaRegiao: any[]

  constructor(
    private capitulosCtrl: CapitulosService,
    private utilsCtrl: UtilsService,
    private modalCtrl: ModalController,
  ) { }

  async ngOnInit() {
    await this.getRegioes()
  }

  async getRegioes() {
    this.carregando = true
    try {
      this.regioes = await this.capitulosCtrl.getRegioes()
    } catch (error) {
      await this.utilsCtrl.mostrarToast(
        error && error.mensagem || 'Houve um erro ao listar regiões, tente mais tarde!'
      )
    } finally {
      this.carregando = false
    }
  }

  async setouRegiaoBuscarCapitulos() {
    const loaderCapitulos = await this.utilsCtrl.mostrarLoader('Carregando capítulos da região...')
    await loaderCapitulos.present()

    try {
      this.capitulosDaRegiao = await this.capitulosCtrl.getCapitulos({
        ofex: this.regiaoSelecionada,
        termoBusca: '',
        offset: 0,
      })
    } catch (error) {
      await this.utilsCtrl.mostrarToast(
        error && error.mensagem || 'Houve um erro ao listar capítulos, tente mais tarde!'
      )
    } finally {
      await loaderCapitulos.dismiss()
    }
  }

  async abrirCapituloDetalhado(capitulo) {
    await this.dismiss()

    const modalCapituloDetalhado = await this.modalCtrl.create({
      component: CapituloSinglePage,
      componentProps: { capitulo }
    })

    await modalCapituloDetalhado.present()
  }

  async dismiss() {
    await this.modalCtrl.dismiss()
  }
}
