import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CapituloSinglePage } from './capitulo-single.page';

const routes: Routes = [
  {
    path: '',
    component: CapituloSinglePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CapituloSinglePageRoutingModule {}
