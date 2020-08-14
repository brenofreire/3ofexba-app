import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-campanha-item',
  templateUrl: './campanha-item.component.html',
  styleUrls: ['./campanha-item.component.scss'],
})
export class CampanhaItemComponent implements OnInit {

  @Input('campanha') campanha

  constructor() { }

  ngOnInit() { }

  toWidth(num, den) {
    const porcentagem = Math.ceil((num / den) * 100)
    const borderRadius = porcentagem >= 100 ? 'border-radius: 8px' : 'border-radius: 8px 0px 0px 8px';

    return `width: ${porcentagem.toFixed(0)}%; ${borderRadius};`
  }
}
