import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-editar-cadastro',
  templateUrl: './editar-cadastro.page.html',
  styleUrls: ['./editar-cadastro.page.scss'],
})
export class EditarCadastroPage implements OnInit {
  public usuarios: any[] = []
  public termoBusca: any = ''
  public carregando = true
  public filtroStatusUsuario = ''
  public deveMostrarInfiniteScroll = false

  constructor(
    private usuariosCtrl: UsuarioService,
    private modalCtrl: ModalController,
    private utilsCtrl: UtilsService,
  ) { }

  async ngOnInit() { 
    await this.getUsuarios()
  }

  async getUsuarios(zerarLista?) {
    this.carregando = false

    try {
      const usuariosCarregados = await this.usuariosCtrl.getUsuariosAdmin({
        termoBusca: this.termoBusca,
        offset: !zerarLista ? this.usuarios && this.usuarios.length || 0 : 0,
        filtroStatusUsuario: this.filtroStatusUsuario
      })

      if(zerarLista) {
        this.usuarios = usuariosCarregados
      } else {
        this.usuarios.push(...usuariosCarregados)
      }

      this.deveMostrarInfiniteScroll = !!(
        usuariosCarregados && usuariosCarregados.length
        && usuariosCarregados.length >= 10
      )

      console.log(this.deveMostrarInfiniteScroll)
    } catch (error) {
      await this.utilsCtrl.mostrarAlert(
        'Ops... Houve um erro ao listar usuários', 
        'Tente novamente mais tarde'
      )
      await this.modalCtrl.dismiss()
    } finally {
      this.carregando = false
    }
  }

  async dismiss() {
    await this.modalCtrl.dismiss()
  }

  async mudarFiltroUsuarios() {
    await this.getUsuarios(true)
  }
}
