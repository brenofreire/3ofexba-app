import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArautoPageRoutingModule } from './arauto-routing.module';

import { ArautoPage } from './arauto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArautoPageRoutingModule
  ],
  declarations: [ArautoPage]
})
export class ArautoPageModule {}
