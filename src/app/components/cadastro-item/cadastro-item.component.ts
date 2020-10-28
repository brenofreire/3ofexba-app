import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastro-item',
  templateUrl: './cadastro-item.component.html',
  styleUrls: ['./cadastro-item.component.scss'],
})
export class CadastroItemComponent implements OnInit {
  @Input('usuario') usuario
  public usuarioSemEditar
  public editarCadastro
  public tipoSenha = 'password'

  constructor() {}

  ngOnInit() {
    this.usuarioSemEditar = JSON.parse(JSON.stringify(this.usuario))
  }

}
