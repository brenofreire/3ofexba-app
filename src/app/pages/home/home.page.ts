import { Component, OnInit } from '@angular/core'
import { UsuarioService } from 'src/app/services/usuario.service'
import { TarefasService } from 'src/app/services/tarefas.service'
import { UtilsService } from 'src/app/services/utils.service'
import { ModalController } from '@ionic/angular'
import { AgostinhoPage } from '../agostinho/agostinho.page'
import { Router } from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public usuarioLogado: any
  public campanhas: any[]
  public isAdmin: boolean

  constructor(
    private usuarioCtrl: UsuarioService,
    private tarefasCtrl: TarefasService,
    private utilsCtrl: UtilsService,
    private routerCtrl: Router
  ) {}

  async ngOnInit() {
    this.usuarioCtrl.getUsuariologadoObservable().subscribe(item => {
      this.usuarioLogado = item
      this.isAdmin = this.usuarioLogado && this.usuarioLogado.role === 'admin'
    })
    if (this.usuarioLogado) {
      await this.getResumoCampanhas()
    }
  }

  public async getResumoCampanhas() {
    try {
      this.campanhas = await this.tarefasCtrl.getResumoCampanhas({ capitulo: this.usuarioLogado.capitulo })
    } catch (error) {
      await this.utilsCtrl.mostrarToast(error)
    }
  }

  public toMeuCargo() {
    const meuCargo = this.usuarioCtrl.toMeuCargo({ usuarioLogado: this.usuarioLogado })

    if (meuCargo) {
      return `
        E aí meu <b>${meuCargo || 'brother!'}</b>, tudo certo?
        Se liga só no resumo das atividades do seu capítulo!
      `
    } else {
      return `
        E aí meu <b>consagrado</b>, tudo certo?
        Estamos regularizando sua situação no app. Logo mais você vai ter acesso às informações.<br /><br />

        Lembrando que somente Mestre Conselheiros, Escrivães, Tesoureiros, Hospitaleiros e Lideranças Regionais 
        terão acesso à este aplicativo por enquanto!<br /><br />

        Valeu? É nois!
      `
    }
  }

  public async logout() {
    await this.usuarioCtrl.logout()
  }

  public async abrirPage(modalName) {
    if (!this.isAdmin && modalName === 'acompanhamento') {
      window.open('https://api.whatsapp.com/send?phone=' + 557391043353)

      return true
    }

    await this.routerCtrl.navigateByUrl(modalName)
  }
}
