import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { TarefasService } from 'src/app/services/tarefas.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public usuarioLogado: any
  public campanhas: any[]

  constructor(
    private usuarioCtrl: UsuarioService,
    private tarefasCtrl: TarefasService,
    private utilsCtrl: UtilsService,
  ) { }

  async ngOnInit() {
    this.usuarioCtrl.getUsuariologadoObservable().subscribe(item => {
      this.usuarioLogado = item
    })
    if(this.usuarioLogado) {
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
    const cargos = {
      mc: 'Mestre Conselheiro',
      esc: 'Escrivão',
      tes: 'Tesoureiro',
      hos: 'Hospitaleiro',
    }

    return `
      E aí meu <b>${cargos[this.usuarioLogado.cargo]}</b>, tudo certo?
      Se liga só no resumo das atividades do seu capítulo!
    `
  }

  public logout() {
    this.usuarioCtrl.logout()
  }
}
