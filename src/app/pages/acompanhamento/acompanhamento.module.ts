import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AcompanhamentoPageRoutingModule } from './acompanhamento-routing.module';

import { AcompanhamentoPage } from './acompanhamento.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AcompanhamentoPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [AcompanhamentoPage]
})
export class AcompanhamentoPageModule {}
