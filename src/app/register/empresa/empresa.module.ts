import {EmpresaRoutingModule} from './empresa-routing.module';
import {EmpresaComponent} from './empresa.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {LoaderComponent} from '../../components/loader/loader.component';

@NgModule({
  imports: [
    CommonModule,
    EmpresaRoutingModule,
    FormsModule
  ],
  declarations: [EmpresaComponent, LoaderComponent]
})
export class EmpresaModule {
}
