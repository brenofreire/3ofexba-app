import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgostinhoPage } from './agostinho.page';

const routes: Routes = [
  {
    path: '',
    component: AgostinhoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgostinhoPageRoutingModule {}
