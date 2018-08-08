import {EmpresaRoutingModule} from './empresa-routing.module';
import {EmpresaComponent} from './empresa.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    EmpresaRoutingModule,
    FormsModule
  ],
  declarations: [EmpresaComponent]
})
export class EmpresaModule {
}
