import { PostulacionesRoutingModule } from './postulaciones-routing.module';
import { PostulacionesComponent } from './postulaciones.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetalleOfertaLaboralComponent } from './detalle-oferta-laboral/detalle-oferta-laboral.component';

@NgModule({
  imports: [
    CommonModule,
    PostulacionesRoutingModule
  ],
  declarations: [PostulacionesComponent, DetalleOfertaLaboralComponent]
})
export class PostulacionesModule { }
