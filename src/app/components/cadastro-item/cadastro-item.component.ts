import { Component, Input, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-cadastro-item',
  templateUrl: './cadastro-item.component.html',
  styleUrls: ['./cadastro-item.component.scss'],
})
export class CadastroItemComponent implements OnInit {
  @Input('usuario') usuario
  public usuarioSemEditar
  public editarCadastro
  public tipoSenha = 'password'
  public carregandoEdicao: boolean
  public customAlertOptions: any = {
    header: 'Status de usuário',
    translucent: true
  }

  constructor(
    private usuarioCtrl: UsuarioService,
    private utilsCtrl: UtilsService,
  ) {}

  ngOnInit() {
    this.usuarioSemEditar = JSON.parse(JSON.stringify(this.usuario))
  }

  async editarCadastroUsuario() {
    this.carregandoEdicao = true
    try {
      await this.usuarioCtrl.editarCadastroUsuario(this.usuario)
      await this.utilsCtrl.mostrarToast('Usuário editado com sucesso!')

      this.editarCadastro = false
    } catch (error) {
      await this.utilsCtrl.mostrarAlert(
        'Houve um erro ao editar cadastro usuário',
        error && error.mensagem || 'Tente novamente mais tarde'
      )
    } finally {
      this.carregandoEdicao = false
    }
  }
}
