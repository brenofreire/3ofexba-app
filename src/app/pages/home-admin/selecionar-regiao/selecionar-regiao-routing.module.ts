import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelecionarRegiaoPage } from './selecionar-regiao.page';

const routes: Routes = [
  {
    path: '',
    component: SelecionarRegiaoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelecionarRegiaoPageRoutingModule {}
