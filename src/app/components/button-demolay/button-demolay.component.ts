import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button-demolay',
  templateUrl: './button-demolay.component.html',
  styleUrls: ['./button-demolay.component.scss'],
})
export class ButtonDemolayComponent implements OnInit {
  @Input('icon') icon: 'demolay' | 'acompanhamento'
  @Input('texto') texto: string
  @Input('tamanho') tamanho: string

  public srcIcon = {
    demolay: '/assets/demolay.png',
    acompanhamento: '/assets/acompanhamento.png',
  }

  constructor() { }

  ngOnInit() {}

}
