import { ApplicationRef, ChangeDetectorRef, Component, OnInit } from '@angular/core'
import { ModalController } from '@ionic/angular'
import { CapitulosService } from 'src/app/services/capitulos.service'
import { UtilsService } from 'src/app/services/utils.service'

@Component({
  selector: 'app-adicionar-criar-organizacao',
  templateUrl: './adicionar-criar-organizacao.page.html',
  styleUrls: ['./adicionar-criar-organizacao.page.scss'],
})
export class AdicionarCriarOrganizacaoPage implements OnInit {
  public organizacao: {
    nome: string
    numero: number
    sigla: string
    ofex: number
  }
  organizacoes: any = []
  carregandoOrgs: boolean = false
  termoBusca: any = ''
  frozenOrganizacao: any

  constructor(
    private ref: ChangeDetectorRef,
    private capitulosCtrl: CapitulosService,
    private utilsCtrl: UtilsService,
    private modalCtrl: ModalController
  ) {
    this.organizacao = this.factoryCapituloInfo('', null, '', null)
  }

  ngOnInit() {}

  factoryCapituloInfo(nome, numero, sigla, ofex) {
    return { nome, numero, sigla, ofex }
  }

  async salvarInfo() {
    const loader = await this.utilsCtrl.mostrarLoader('Salvando informações')
    loader.present()

    try {
      this.capitulosCtrl.adicionarOuEditarOrganizacao(this.organizacao)

      this.utilsCtrl.mostrarAlert('Ação realizada com sucesso!', '')

      this.limparOrgManuseada()
      this.setOrganizacoes([])
    } catch (error) {
      const mensagem = (error && error.mensagem) || 'Houve um erro ao salvar informações'
      this.utilsCtrl.mostrarAlert(mensagem, 'Tente novamente mais tarde')
    } finally {
      loader.dismiss()
    }
  }

  async dismiss() {
    await this.modalCtrl.dismiss()
  }

  setarOrgManuseada(organizacao) {
    this.organizacao = JSON.parse(JSON.stringify(organizacao))
    this.setFrozenOrganizacao(organizacao.nome)
  }

  setFrozenOrganizacao(nome) {
    this.frozenOrganizacao = nome
  }

  async getOrganizacoes() {
    this.carregandoOrgs = true
    this.organizacoes = []

    try {
      this.ref.detectChanges()

      const organizacoes = await this.capitulosCtrl.getCapitulosAdmin({ termoBusca: this.termoBusca })

      this.setOrganizacoes(organizacoes)
    } catch (error) {
      await this.utilsCtrl.mostrarAlert('Houve um erro ao buscar organizações', 'Tente novamente mais tarde')
    } finally {
      this.carregandoOrgs = false
    }
  }

  setOrganizacoes(organizacoes) {
    this.organizacoes = JSON.parse(JSON.stringify(organizacoes))
  }

  debounceSearch() {
    this.utilsCtrl.debounce(() => this.getOrganizacoes(), 500)()
  }

  get temOrganizacoes() {
    return this.organizacoes && this.organizacoes.length
  }

  limparOrgManuseada() {
    this.setarOrgManuseada({})
    this.setFrozenOrganizacao('')
  }

  removeOrgFromArray(org) {
    this.organizacoes = this.organizacoes && this.organizacoes.filter(inner => inner.id !== org.id)
  }
}
