import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarCadastroPageRoutingModule } from './editar-cadastro-routing.module';

import { EditarCadastroPage } from './editar-cadastro.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarCadastroPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [EditarCadastroPage]
})
export class EditarCadastroPageModule {}
