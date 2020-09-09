import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { TarefasPage } from './tarefas/tarefas.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'campanha',
    children: [
      {
        path: ':tipoCampanha',
        loadChildren: () => import('./tarefas/tarefas.module').then(m => m.TarefasPageModule)
      }
    ]
  },
  {
    path: 'tarefas',
    loadChildren: () => import('./tarefas/tarefas.module').then(m => m.TarefasPageModule)
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
export class HomePageRoutingModule { }
