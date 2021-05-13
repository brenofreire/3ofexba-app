import { Component, OnInit, Input } from '@angular/core'

@Component({
  selector: 'app-button-dm',
  templateUrl: './button-dm.component.html',
  styleUrls: ['./button-dm.component.scss'],
})
export class ButtonDemolayComponent implements OnInit {
  @Input('icon') icon: 'dm' | 'acompanhamento'
  @Input('texto') texto: string
  @Input('tamanho') tamanho: string

  public srcIcon = {
    dm: '/assets/dm.png',
    acompanhamento: '/assets/acompanhamento.png',
  }

  constructor() {}

  ngOnInit() {}
}
