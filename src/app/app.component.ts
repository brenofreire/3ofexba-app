import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { UsuarioService } from './services/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private routerCtrl: Router,
    private usuarioCtrl: UsuarioService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      const usuarioLogado = await this.storage.get('usuario')

      if(!usuarioLogado) {
        await this.routerCtrl.navigateByUrl('')
      } else {        
        await this.setUsuarioLogadoRoot(usuarioLogado)
      }
    });
  }
  
  public async setUsuarioLogadoRoot(usuario) {
    this.usuarioCtrl.setUsuarioLogado(usuario)
    const homeRoute = this.usuarioCtrl.getHomeRoute(usuario.role)
    await this.routerCtrl.navigateByUrl(homeRoute)
  }
}
