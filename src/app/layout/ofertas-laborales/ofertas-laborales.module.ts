import { OfertasLaboralesRoutingModule } from './ofertas-laborales-routing.module';
import { OfertasLaboralesComponent } from './ofertas-laborales.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    OfertasLaboralesRoutingModule
  ],
  declarations: [OfertasLaboralesComponent]
})
export class OfertasLaboralesModule { }
