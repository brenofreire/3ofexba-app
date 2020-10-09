import { Component, OnInit } from '@angular/core';
import { AgostinhoService } from 'src/app/services/agostinho.service';
import { UtilsService } from 'src/app/services/utils.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-agostinho',
  templateUrl: './agostinho.page.html',
  styleUrls: ['./agostinho.page.scss'],
})
export class AgostinhoPage implements OnInit {
  public mensagensAgostinho: any[]
  public usuarioLogado: any
  public meuCargo

  constructor(
    private agostinhoCtrl: AgostinhoService,
    private utilsCtrl: UtilsService,
    private usuarioCtrl: UsuarioService,
  ) { }

  async ngOnInit() {
    this.usuarioCtrl.getUsuariologadoObservable().subscribe(usuario => {
      if(usuario) {
        this.usuarioLogado = usuario
      }
    })

    this.meuCargo = this.usuarioLogado && this.usuarioCtrl.toMeuCargo({
      usuarioLogado: this.usuarioLogado
    })
    

    await this.inicializaPagina()
  }

  async inicializaPagina() {
    try {
      this.mensagensAgostinho = await this.agostinhoCtrl.getMensagensAgostinho({
        offset: this.mensagensAgostinho && this.mensagensAgostinho.length || 0
      })
    } catch (error) {
      const mensagem = error && error.mensagem || 'Houve um erro ao listar mensagens do Agostinho'

      await this.utilsCtrl.mostrarToast(mensagem)
    }
  }  

  async carregarMaisMensagens(event) {
    await this.inicializaPagina()

    event.target.complete()
  }
}
