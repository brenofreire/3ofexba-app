import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdicionarCriarOrganizacaoPageRoutingModule } from './adicionar-criar-organizacao-routing.module';

import { AdicionarCriarOrganizacaoPage } from './adicionar-criar-organizacao.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdicionarCriarOrganizacaoPageRoutingModule
  ],
  declarations: [AdicionarCriarOrganizacaoPage]
})
export class AdicionarCriarOrganizacaoPageModule {}
