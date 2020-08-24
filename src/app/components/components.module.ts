import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CampanhaItemComponent } from './campanha-item/campanha-item.component';
import { ButtonDemolayComponent } from './button-demolay/button-demolay.component';



@NgModule({
  declarations: [
    LoaderComponent, 
    CampanhaItemComponent,
    ButtonDemolayComponent,
  ],
  entryComponents: [
    LoaderComponent, 
    CampanhaItemComponent,
    ButtonDemolayComponent,
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
  ]
})
export class ComponentsModule { }
