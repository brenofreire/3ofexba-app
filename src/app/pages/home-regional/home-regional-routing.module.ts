import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeRegionalPage } from './home-regional.page';

const routes: Routes = [
  {
    path: '',
    component: HomeRegionalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRegionalPageRoutingModule {}
