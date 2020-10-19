import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CriarEditarTarefaPage } from './criar-editar-tarefa.page';

const routes: Routes = [
  {
    path: '',
    component: CriarEditarTarefaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CriarEditarTarefaPageRoutingModule {}
