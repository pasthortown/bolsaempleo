import { PostulacionesRoutingModule } from './postulaciones-routing.module';
import { PostulacionesComponent } from './postulaciones.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    PostulacionesRoutingModule
  ],
  declarations: [PostulacionesComponent]
})
export class PostulacionesModule { }
