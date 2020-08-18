import { Component, OnInit, Input } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

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
    console.log(this.campanha.cargoTarefa, this.usuarioLogado);
    
    if(this.campanha.cargoTarefa.includes(this.usuarioLogado.cargo)) {
      return ' - Sua campanha'
    }
  }
}
