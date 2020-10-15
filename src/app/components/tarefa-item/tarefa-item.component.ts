import { Component, OnInit, Input } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { TarefasService } from 'src/app/services/tarefas.service';

@Component({
  selector: 'tarefa-item',
  templateUrl: './tarefa-item.component.html',
  styleUrls: ['./tarefa-item.component.scss'],
})
export class TarefaItemComponent implements OnInit {
  @Input('tarefa') tarefaAux: any
  public tarefa: any
  public usuario: any

  constructor(
    private usuarioCtrl: UsuarioService,
    private tarefasCtrl: TarefasService,
  ) { }

  ngOnInit() {
    this.usuarioCtrl.getUsuariologadoObservable().subscribe(item => {
      this.usuario = item
    })

    this.tarefa = this.tarefaAux
  }

  async abrirMudarStatusTarefa() {
    try {
      const novoStatus = await this.tarefasCtrl.actionSheetStatusTarefa({
        tarefa: this.tarefa,
        cargo: this.usuario.cargo
      })

      await novoStatus.present()

      const { data: situacaoDoCapituloNaAtividade } = await novoStatus.onDidDismiss()

      if(situacaoDoCapituloNaAtividade) {
        this.tarefa.statusCapituloSlug = situacaoDoCapituloNaAtividade.statusSlug 
        this.tarefa.statusCapituloLabel = situacaoDoCapituloNaAtividade.statusNome 
        this.tarefa.statusCapitulo = situacaoDoCapituloNaAtividade.statusCapitulo 
      }
    } catch (error) {
      throw error
    }
  }
}
