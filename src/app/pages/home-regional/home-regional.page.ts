import { Component, OnInit } from '@angular/core';
import { CapitulosService } from 'src/app/services/capitulos.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-home-regional',
  templateUrl: './home-regional.page.html',
  styleUrls: ['./home-regional.page.scss'],
})
export class HomeRegionalPage implements OnInit {
  public capitulosDaRegiao: any
  public usuarioLogado: any

  constructor(
    private utilsCtrl: UtilsService,
    private capitulosCtrl: CapitulosService,
    private usuarioCtrl: UsuarioService,
  ) { }

  async ngOnInit() {
    this.usuarioCtrl.getUsuariologadoObservable().subscribe(usuario => {
      this.usuarioLogado = usuario
    })

    await this.setouRegiaoBuscarCapitulos()
  }

  async setouRegiaoBuscarCapitulos() {
    const loaderCapitulos = await this.utilsCtrl.mostrarLoader('Carregando capítulos da região...')
    await loaderCapitulos.present()

    try {
      this.capitulosDaRegiao = await this.capitulosCtrl.getCapitulos({
        ofex: this.usuarioLogado.cargo,
        termoBusca: '',
        offset: 0,
      })
    } catch (error) {
      await this.utilsCtrl.mostrarToast(
        error && error.mensagem || 'Houve um erro ao listar capítulos, tente mais tarde!'
      )
    } finally {
      await loaderCapitulos.dismiss()
    }
  }

  async logout() {
    await this.usuarioCtrl.logout()
  }
}
