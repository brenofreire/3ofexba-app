import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LoaderComponent } from './loader/loader.component'
import { FormsModule } from '@angular/forms'
import { IonicModule } from '@ionic/angular'
import { CampanhaItemComponent } from './campanha-item/campanha-item.component'
import { ButtonDmComponent } from './button-dm/button-dm.component'
import { TarefaItemComponent } from './tarefa-item/tarefa-item.component'
import { BotoesAcaoComponent } from './botoes-acao/botoes-acao.component'
import { PseudoTitleComponent } from './pseudo-title/pseudo-title.component'
import { CadastroItemComponent } from './cadastro-item/cadastro-item.component'
import { CapitulosRegiaoComponent } from './capitulos-regiao/capitulos-regiao.component'
import { ContentComponent } from './content-dm/content.component'
import { CapituloItemComponent } from './capitulo-item/capitulo-item.component'

@NgModule({
  declarations: [
    LoaderComponent,
    CampanhaItemComponent,
    ButtonDmComponent,
    TarefaItemComponent,
    ContentComponent,
    BotoesAcaoComponent,
    PseudoTitleComponent,
    CadastroItemComponent,
    CapitulosRegiaoComponent,
    CapituloItemComponent,
  ],
  entryComponents: [
    LoaderComponent,
    CampanhaItemComponent,
    ButtonDmComponent,
    TarefaItemComponent,
    ContentComponent,
    BotoesAcaoComponent,
    PseudoTitleComponent,
    CadastroItemComponent,
    CapitulosRegiaoComponent,
    CapituloItemComponent,
  ],
  imports: [FormsModule, IonicModule, CommonModule],
  exports: [
    LoaderComponent,
    CampanhaItemComponent,
    ButtonDmComponent,
    TarefaItemComponent,
    ContentComponent,
    BotoesAcaoComponent,
    PseudoTitleComponent,
    CadastroItemComponent,
    CapitulosRegiaoComponent,
    CapituloItemComponent,
  ],
})
export class ComponentsModule {}
