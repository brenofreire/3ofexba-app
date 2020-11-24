import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-acompanhamento',
  templateUrl: './acompanhamento.page.html',
  styleUrls: ['./acompanhamento.page.scss'],
})
export class AcompanhamentoPage implements OnInit {
  public postagem = {
    mensagem: null,
    destinatarios: [],
    remetente: null,
  }
  public usuarioLogado: any
  public customAlertOptions: any = {
    header: 'Cargos disponíveis',
    translucent: true
  }

  constructor(
    private usuarioCtrl: UsuarioService,
    private utilsCtrl: UtilsService,
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
    this.usuarioCtrl.getUsuariologadoObservable().subscribe(usuario => {
      this.usuarioLogado = usuario
    })
  }

  isBotaoHabilitado() {
    const naoTemCargoSelecionado = !this.postagem.destinatarios || !this.postagem.destinatarios.length
    const naoTemMensagem = !this.postagem.mensagem || !this.postagem.mensagem.length

    if (naoTemMensagem || naoTemCargoSelecionado) {
      return true
    }

    return false
  }

  async postar() {
    try {
      this.postagem.remetente = this.usuarioLogado.id

      await this.usuarioCtrl.postarAgostinho(this.postagem)

      await this.utilsCtrl.mostrarToast('Mensagem enviada com sucesso!')

      await this.dismiss()
    } catch (error) {
      const mensagem = error && error.mensagem 
        || 'Houve um erro ao publicar mensagem'

      await this.utilsCtrl.mostrarAlert(mensagem, 'Tente novamente mais tarde!')
    }
  }

  async dismiss() {
    await this.modalCtrl.dismiss()
  }
}
