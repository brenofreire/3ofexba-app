import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgostinhoPageRoutingModule } from './agostinho-routing.module';

import { AgostinhoPage } from './agostinho.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgostinhoPageRoutingModule
  ],
  declarations: [AgostinhoPage]
})
export class AgostinhoPageModule {}
