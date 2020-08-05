import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public informacoesUsuario:any = {}

  constructor(
    private usuarioCtrl: UsuarioService,
    private utilsCtrl: UtilsService,
  ) { }

  ngOnInit() { }

  public async login() {
    if(this.utilsCtrl.validateEmail(this.informacoesUsuario.email)) {
      try {
        await this.usuarioCtrl.login(this.informacoesUsuario)
      } catch (error) {
        await this.utilsCtrl.mostrarToast(error)
      }
    } else {
      await this.utilsCtrl.mostrarToast('Email inválido')
    }
  }
}
