import { CandidatosRoutingModule } from './candidatos-routing.module';
import { CandidatosComponent } from './candidatos.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    CandidatosRoutingModule
  ],
  declarations: [CandidatosComponent]
})
export class CandidatosModule { }
