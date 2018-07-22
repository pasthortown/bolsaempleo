import { PostulantesRoutingModule } from './postulantes-routing.module';
import { PostulantesComponent } from './postulantes.component';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FiltroComponent } from './filtro/filtro.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    PostulantesRoutingModule
  ],
  declarations: [PostulantesComponent, FiltroComponent]
})
export class PostulantesModule { }
