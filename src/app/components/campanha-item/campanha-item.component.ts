import { Component, OnInit, Input } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-campanha-item',
  templateUrl: './campanha-item.component.html',
  styleUrls: ['./campanha-item.component.scss'],
})
export class CampanhaItemComponent implements OnInit {

  @Input('campanha') campanha
  public usuarioLogado

  constructor(
    private usuarioCtrl: UsuarioService,
    private routerCtrl: Router,
  ) { }

  ngOnInit() { 
    this.usuarioCtrl.getUsuariologadoObservable().subscribe(item => {
      this.usuarioLogado = item
    })
  }

  toWidth(num, den) {
    const porcentagem = Math.ceil((num / den) * 100)
    const borderRadius = porcentagem >= 100 ? 'border-radius: 8px' : 'border-radius: 8px 0px 0px 8px';

    return `width: ${porcentagem.toFixed(0)}%; ${borderRadius};`
  }

  toMinhaCampanha() {
    if(this.campanha.cargoTarefa.includes(this.usuarioLogado.cargo)) {
      return true
    }
  }

  async abrirCamapnha() {
    await this.routerCtrl.navigateByUrl(`home/campanha/${this.campanha.slug}`)
  }
}
