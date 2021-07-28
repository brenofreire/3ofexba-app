import { Component, OnInit } from '@angular/core'
import { ModalController } from '@ionic/angular'
import { UsuarioService } from 'src/app/services/usuario.service'
import { AcompanhamentoPage } from '../acompanhamento/acompanhamento.page'
import { AdicionarCriarOrganizacaoPage } from './adicionar-criar-organizacao/adicionar-criar-organizacao.page'
import { CriarEditarTarefaPage } from '../tarefas/criar-editar-tarefa/criar-editar-tarefa.page'
import { EditarCadastroPage } from './editar-cadastro/editar-cadastro.page'
import { SelecionarRegiaoPage } from './selecionar-regiao/selecionar-regiao.page'

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.page.html',
  styleUrls: ['./home-admin.page.scss'],
})
export class HomeAdminPage implements OnInit {
  public usuarioLogado: any

  constructor(private usuarioCtrl: UsuarioService, private modalCtrl: ModalController) {}

  ngOnInit() {
    this.usuarioCtrl.getUsuariologadoObservable().subscribe(usuarioLogado => {
      if (usuarioLogado) {
        this.usuarioLogado = usuarioLogado
      }
    })
  }

  async abrirCriacaoEdicaoCampanha() {
    await this.abrirModal({
      component: CriarEditarTarefaPage,
    })
  }

  async selecionarRegiao() {
    await this.abrirModal({
      component: SelecionarRegiaoPage,
    })
  }

  async abrirEdicaoCadastro() {
    await this.abrirModal({
      component: EditarCadastroPage,
    })
  }

  async abrirModal({ component }) {
    const abrirModal = await this.modalCtrl.create({ component })

    return await abrirModal.present()
  }

  public async logout() {
    await this.usuarioCtrl.logout()
  }

  public async abrirPage(nomeDaPagina: 'acompanhamento') {
    const modaisPossiveis = {
      acompanhamento: AcompanhamentoPage,
    }

    await this.abrirModal({
      component: modaisPossiveis[nomeDaPagina],
    })
  }

  async adicionarOuEditarOrganizacao() {
    await this.abrirModal({ component: AdicionarCriarOrganizacaoPage })
  }

  butaoPorra() {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      console.log('Service Worker and Push is supported')

      navigator.serviceWorker
        .register('sw.js')
        .then(function (swReg) {
          console.log('Service Worker is registered', swReg)

          // const swRegistration = swReg
        })
        .catch(function (error) {
          console.error('Service Worker Error', error)
        })
    } else {
      console.warn('Push messaging is not supported')
    }
  }
}
