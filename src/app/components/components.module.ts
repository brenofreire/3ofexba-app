import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CampanhaItemComponent } from './campanha-item/campanha-item.component';



@NgModule({
  declarations: [LoaderComponent, CampanhaItemComponent],
  entryComponents: [LoaderComponent, CampanhaItemComponent],
  imports: [
    FormsModule,
    IonicModule,
    CommonModule
  ],
  exports: [LoaderComponent, CampanhaItemComponent]
})
export class ComponentsModule { }
