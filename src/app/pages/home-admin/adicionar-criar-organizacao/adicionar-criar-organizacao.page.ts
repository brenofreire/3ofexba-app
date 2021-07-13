import { Component, OnInit } from '@angular/core'
import { CapitulosService } from 'src/app/services/capitulos.service'
import { UtilsService } from 'src/app/services/utils.service'

@Component({
  selector: 'app-adicionar-criar-organizacao',
  templateUrl: './adicionar-criar-organizacao.page.html',
  styleUrls: ['./adicionar-criar-organizacao.page.scss'],
})
export class AdicionarCriarOrganizacaoPage implements OnInit {
  public capituloInfo: {
    nome: string
    numero: number
    sigla: string
    ofex: number
  }

  constructor(private capitulosCtrl: CapitulosService, private utilsCtrl: UtilsService) {
    this.capituloInfo = this.factoryCapituloInfo('', null, '', null)
  }

  ngOnInit() {}

  factoryCapituloInfo(nome, numero, sigla, ofex) {
    return { nome, numero, sigla, ofex }
  }

  async salvarInfo() {
    const loader = await this.utilsCtrl.mostrarLoader('Salvando informações')
    loader.present()

    try {
      this.capitulosCtrl.adicionarOuEditarOrganizacao(this.capituloInfo)
    } catch (error) {
      const mensagem = (error && error.mensagem) || 'Houve um erro ao salvar informações'
      this.utilsCtrl.mostrarAlert(mensagem, 'Tente novamente mais tarde')
    } finally {
      loader.dismiss()
    }
  }
}
