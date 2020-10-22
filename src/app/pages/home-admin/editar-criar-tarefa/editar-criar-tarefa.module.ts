import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarCriarTarefaPageRoutingModule } from './editar-criar-tarefa-routing.module';

import { EditarCriarTarefaPage } from './editar-criar-tarefa.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarCriarTarefaPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [EditarCriarTarefaPage]
})
export class EditarCriarTarefaPageModule {}
