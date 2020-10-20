import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { CriarEditarTarefaPage } from '../tarefas/criar-editar-tarefa/criar-editar-tarefa.page';
import { SelecionarRegiaoPage } from './selecionar-regiao/selecionar-regiao.page';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.page.html',
  styleUrls: ['./home-admin.page.scss'],
})
export class HomeAdminPage implements OnInit {
  public usuarioLogado: any

  constructor(
    private usuarioCtrl: UsuarioService,
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
    this.usuarioCtrl.getUsuariologadoObservable().subscribe(usuarioLogado => {
      if(usuarioLogado) {
        this.usuarioLogado = usuarioLogado
      }
    })
  }

  async abrirCriacaoEdicaoCampanha() {
    const modalCriacaoEdicaoCamapanha = await this.modalCtrl.create({
      component: CriarEditarTarefaPage,      
    })

    return await modalCriacaoEdicaoCamapanha.present()
  }

  async selecionarRegiao() {
    const modalCriacaoEdicaoCamapanha = await this.modalCtrl.create({
      component: SelecionarRegiaoPage,
    })

    return await modalCriacaoEdicaoCamapanha.present()
  }

  public async logout() {
    await this.usuarioCtrl.logout()
  }
}
