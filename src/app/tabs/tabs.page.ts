import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
  public usuarioLogado

  constructor(
    private modalCtrl: ModalController,
    private router: Router,
    private usuarioCtrl: UsuarioService,
  ) { }

  ngOnInit() {
    this.usuarioCtrl.getUsuariologadoObservable().subscribe(async usuario => {
      if (!usuario) {
        await this.router.navigateByUrl('login')
      }
    })
  }

  async abrirModal(component) {
    const modal = await this.modalCtrl.create({ component })

    return modal.present()
  }
}

