import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CampanhaItemComponent } from './campanha-item/campanha-item.component';
import { ButtonDemolayComponent } from './button-demolay/button-demolay.component';
import { TarefaItemComponent } from './tarefa-item/tarefa-item.component';
import { ContentComponent } from './content-demolay/content.component';
import { BotoesAcaoComponent } from './botoes-acao/botoes-acao.component';
import { PseudoTitleComponent } from './pseudo-title/pseudo-title.component';
import { CadastroItemComponent } from './cadastro-item/cadastro-item.component';
import { CapitulosRegiaoComponent } from './capitulos-regiao/capitulos-regiao.component';



@NgModule({
  declarations: [
    LoaderComponent, 
    CampanhaItemComponent,
    ButtonDemolayComponent,
    TarefaItemComponent,
    ContentComponent,
    BotoesAcaoComponent,
    PseudoTitleComponent,
    CadastroItemComponent,
    CapitulosRegiaoComponent,
  ],
  entryComponents: [
    LoaderComponent, 
    CampanhaItemComponent,
    ButtonDemolayComponent,
    TarefaItemComponent,
    ContentComponent,
    BotoesAcaoComponent,
    PseudoTitleComponent,
    CadastroItemComponent,
    CapitulosRegiaoComponent,
  ],
  imports: [
    FormsModule,
    IonicModule,
    CommonModule
  ],
  exports: [
    LoaderComponent, 
    CampanhaItemComponent,
    ButtonDemolayComponent,
    TarefaItemComponent,
    ContentComponent,
    BotoesAcaoComponent,
    PseudoTitleComponent,
    CadastroItemComponent,
    CapitulosRegiaoComponent,
  ]
})
export class ComponentsModule { }
