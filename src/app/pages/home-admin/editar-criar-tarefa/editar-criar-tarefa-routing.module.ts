import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarCriarTarefaPage } from './editar-criar-tarefa.page';

const routes: Routes = [
  {
    path: '',
    component: EditarCriarTarefaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarCriarTarefaPageRoutingModule {}
