import { HojaVidaRoutingModule } from './hoja-vida-routing.module';
import { HojaVidaComponent } from './hoja-vida.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    HojaVidaRoutingModule
  ],
  declarations: [HojaVidaComponent]
})
export class HojaVidaModule { }
