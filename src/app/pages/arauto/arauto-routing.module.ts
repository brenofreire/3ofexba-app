import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArautoPage } from './arauto.page';

const routes: Routes = [
  {
    path: '',
    component: ArautoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArautoPageRoutingModule {}
