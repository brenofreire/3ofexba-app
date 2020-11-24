import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeRegionalPageRoutingModule } from './home-regional-routing.module';

import { HomeRegionalPage } from './home-regional.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeRegionalPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [HomeRegionalPage]
})
export class HomeRegionalPageModule {}
