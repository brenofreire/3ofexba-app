import { Component } from '@angular/core'

import { Platform } from '@ionic/angular'
import { SplashScreen } from '@ionic-native/splash-screen/ngx'
import { StatusBar } from '@ionic-native/status-bar/ngx'
import { Storage } from '@ionic/storage'
import { Router } from '@angular/router'
import { UsuarioService } from './services/usuario.service'
import { SwPush } from '@angular/service-worker'
import { UtilsService } from './services/utils.service'
import { NotificationService } from './services/notification.service'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public VAPID_PUBLIC_KEY = 'BD93KEBZ7QFBg6neYY1RI84GSFivqp8qE5XhntkNdgfbQx9EObCPzb04Wpit3GG-hdv6djuvpennntN2jU0KgUE'
  // {
  //   privateKey: 'IDroJ2FHS4UholEPbU3QPtOLbM3DnTIu6P95H26OUuE',
  // }

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private routerCtrl: Router,
    private usuarioCtrl: UsuarioService,
    private swPush: SwPush,
    private notificationCtrl: NotificationService,
    private utilsCtrl: UtilsService
  ) {
    this.initializeApp()
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      this.statusBar.styleDefault()
      this.splashScreen.hide()
      const usuarioLogado = await this.storage.get('usuario')

      if (!usuarioLogado) {
        await this.routerCtrl.navigateByUrl('')
      } else {
        await this.setUsuarioLogadoRoot(usuarioLogado)
        if (usuarioLogado.role === 'comum') {
          this.subscribeToNotifications()
        }
      }
    })
  }

  public async setUsuarioLogadoRoot(usuario) {
    this.usuarioCtrl.setUsuarioLogado(usuario)
  }

  subscribeToNotifications() {
    this.swPush
      .requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY,
      })
      .then(sub => this.notificationCtrl.addPushSubscriber(sub))
      .catch(() => this.utilsCtrl.mostrarToast('Houve um erro ao configurar notificações, por favor entre em contato conosco!'))
  }
}
