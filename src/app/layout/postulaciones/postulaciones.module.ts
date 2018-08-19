import {PostulacionesRoutingModule} from './postulaciones-routing.module';
import {PostulacionesComponent} from './postulaciones.component';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CommonModule} from '@angular/common';
import {DetalleOfertaLaboralComponent} from './detalle-oferta-laboral/detalle-oferta-laboral.component';

@NgModule({
  imports: [
    CommonModule,
    PostulacionesRoutingModule,
    NgbModule
  ],
  declarations: [PostulacionesComponent, DetalleOfertaLaboralComponent]
})
export class PostulacionesModule {
}
