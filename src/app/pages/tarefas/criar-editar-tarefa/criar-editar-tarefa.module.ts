import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CriarEditarTarefaPageRoutingModule } from './criar-editar-tarefa-routing.module';

import { CriarEditarTarefaPage } from './criar-editar-tarefa.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CriarEditarTarefaPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [CriarEditarTarefaPage]
})
export class CriarEditarTarefaPageModule {}
