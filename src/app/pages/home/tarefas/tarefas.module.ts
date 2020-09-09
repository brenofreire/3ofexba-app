import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TarefasPageRoutingModule } from './tarefas-routing.module';

import { TarefasPage } from './tarefas.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TarefasPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [TarefasPage]
})
export class TarefasPageModule {}
