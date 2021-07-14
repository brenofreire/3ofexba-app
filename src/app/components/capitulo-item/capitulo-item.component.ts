import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'app-capitulo-item',
  templateUrl: './capitulo-item.component.html',
  styleUrls: ['./capitulo-item.component.scss'],
})
export class CapituloItemComponent implements OnInit {
  @Input('capitulo') capitulo = {}

  constructor() {}

  ngOnInit() {}
}
