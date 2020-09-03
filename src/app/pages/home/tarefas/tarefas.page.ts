import { Component, OnInit } from '@angular/core';
import { TarefasService } from 'src/app/services/tarefas.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tarefas',
  templateUrl: './tarefas.page.html',
  styleUrls: ['./tarefas.page.scss'],
})
export class TarefasPage implements OnInit {
  public tarefas: any[]
  public slugTarefa: string
  public tituloTarefa: string
  public carregandoTarefas: boolean = true

  constructor(
    private tarefasCtrl: TarefasService,
    private route: ActivatedRoute,
  ) { }

  async ngOnInit() {
    this.route.paramMap.subscribe(params => {      
      this.slugTarefa = params.get('tipoCampanha')
    })

    await this.getTarefas()
  }

  async getTarefas() {
    try {
      const { tarefas, tituloTarefa } = await this.tarefasCtrl.getTarefas({
        nomeTarefa: this.slugTarefa
      })

      this.tituloTarefa = tituloTarefa
      this.tarefas = tarefas

      console.log(this.tarefas)
    } catch (error) {
      console.log(error)
    } finally {
      this.carregandoTarefas = false
    }
  }
}
