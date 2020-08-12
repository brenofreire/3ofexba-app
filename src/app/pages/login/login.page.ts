import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Router } from '@angular/router';

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
    private routerCtrl: Router,
  ) { }

  ngOnInit() { }

  public async login() {
    if(this.utilsCtrl.validateEmail(this.informacoesUsuario.email)) {
      try {
        await this.usuarioCtrl.login(this.informacoesUsuario)
        await this.goTo('home')
      } catch (error) {
        console.log(error)
        await this.utilsCtrl.mostrarToast(error && error.mensagem || 'Erro ao fazer login, tente novamente mais tarde')
      }
    } else {
      await this.utilsCtrl.mostrarToast('Email inválido')
    }
  }

  public async goTo (url: string) {
    await this.routerCtrl.navigateByUrl(url)
  }
}
