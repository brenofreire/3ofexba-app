import { Component, OnInit, Input } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { TarefasService } from 'src/app/services/tarefas.service';

@Component({
  selector: 'tarefa-item',
  templateUrl: './tarefa-item.component.html',
  styleUrls: ['./tarefa-item.component.scss'],
})
export class TarefaItemComponent implements OnInit {
  @Input('tarefa') tarefa: any
  public usuario: any;

  constructor(
    private usuarioCtrl: UsuarioService,
    private tarefasCtrl: TarefasService,
  ) { }

  ngOnInit() {
    this.usuarioCtrl.getUsuariologadoObservable().subscribe(item => {
      this.usuario = item
    })
  }

  async abrirMudarStatusTarefa() {
    // Adicionar verificação de role para MC ... ESC ...
    await this.tarefasCtrl.actionSheetStatusTarefa({ tarefa: this.tarefa })
  }
}
