import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.page.html',
  styleUrls: ['./home-admin.page.scss'],
})
export class HomeAdminPage implements OnInit {
  public usuarioLogado: any

  constructor(
    private usuarioCtrl: UsuarioService,    
  ) { }

  ngOnInit() {
    this.usuarioCtrl.getUsuariologadoObservable().subscribe(usuarioLogado => {
      if(usuarioLogado) {
        this.usuarioLogado = usuarioLogado
      }
    })
  }

}
