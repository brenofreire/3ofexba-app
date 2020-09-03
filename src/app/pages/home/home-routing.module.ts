import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'campanha',
    loadChildren: () => import('./tarefas/tarefas-routing.module').then( m => m.TarefasPageRoutingModule)
  },
  {
    path: 'tarefas',
    loadChildren: () => import('./tarefas/tarefas.module').then( m => m.TarefasPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
