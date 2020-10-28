import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeAdminPage } from './home-admin.page';

const routes: Routes = [
  {
    path: '',
    component: HomeAdminPage
  },
  {
    path: 'selecionar-regiao',
    loadChildren: () => import('./selecionar-regiao/selecionar-regiao.module').then( m => m.SelecionarRegiaoPageModule)
  },
  {
    path: 'editar-criar-tarefa',
    loadChildren: () => import('./editar-criar-tarefa/editar-criar-tarefa.module').then( m => m.EditarCriarTarefaPageModule)
  },
  {
    path: 'editar-cadastro',
    loadChildren: () => import('./editar-cadastro/editar-cadastro.module').then( m => m.EditarCadastroPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeAdminPageRoutingModule {}
