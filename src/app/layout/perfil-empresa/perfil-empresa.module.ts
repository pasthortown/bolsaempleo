import {PerfilEmpresaRoutingModule} from './perfil-empresa-routing.module';
import {PerfilEmpresaComponent} from './perfil-empresa.component';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    PerfilEmpresaRoutingModule,
    NgbModule
  ],
  declarations: [PerfilEmpresaComponent]
})
export class PerfilEmpresaModule {
}
