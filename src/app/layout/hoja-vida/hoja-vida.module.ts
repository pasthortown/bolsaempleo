import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HojaVidaRoutingModule } from './hoja-vida-routing.module';
import { HojaVidaComponent } from './hoja-vida.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    HojaVidaRoutingModule,
    NgbModule,
    FormsModule
  ],
  declarations: [HojaVidaComponent]
})
export class HojaVidaModule { }
