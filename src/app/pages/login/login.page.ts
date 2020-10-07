import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

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
    private storage: Storage,
  ) { }

  async ngOnInit() { 
    const usuarioLogado = await this.storage.get('usuario')
    const homeRoute = usuarioLogado && this.usuarioCtrl.getHomeRoute(usuarioLogado.role) || ''
    await this.routerCtrl.navigateByUrl(homeRoute)
  }

  public async login() {    
    if(this.utilsCtrl.validateEmail(this.informacoesUsuario.email)) {
      const loader = await this.utilsCtrl.mostrarLoader('Verificando credenciais...')
      await loader.present()

      try {
        const usuario = await this.usuarioCtrl.login(this.informacoesUsuario)
        
        await this.goTo(this.usuarioCtrl.getHomeRoute(usuario.role))

      } catch (error) {
        await this.utilsCtrl.mostrarAlert('Houve um erro!', error && error.mensagem || 'Erro ao fazer login, tente novamente mais tarde')
      } finally {
        await loader.dismiss()
      }
    } else {
      await this.utilsCtrl.mostrarToast('Email inválido')
    }
  }

  public async cadastro() {
    if(this.utilsCtrl.validateEmail(this.informacoesUsuario.email)) {
      try {
        await this.usuarioCtrl.cadastro(this.informacoesUsuario)        
        await this.utilsCtrl.mostrarAlert('Conta criada com sucesso!', 'Aguarde a aprovação da nossa equipe antes de logar')
      } catch (error) {
        await this.utilsCtrl.mostrarAlert('Houve um erro!', error && error.mensagem || 'Erro ao cadastrar, tente novamente mais tarde')
      }
    } else {
      await this.utilsCtrl.mostrarToast('Email inválido')
    }
  }

  public async goTo (url: string) {
    await this.routerCtrl.navigateByUrl(url)
  }
}
