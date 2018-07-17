import {PerfilEmpresaRoutingModule} from './perfil-empresa-routing.module';
import {PerfilEmpresaComponent} from './perfil-empresa.component';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CommonModule} from '@angular/common';
import {InformacionEmpresaComponent} from './informacion-empresa/informacion-empresa.component';
import {OfertasLaboralesComponent} from './ofertas-laborales/ofertas-laborales.component';

@NgModule({
  imports: [
    CommonModule,
    PerfilEmpresaRoutingModule,
    NgbModule
  ],
  declarations: [PerfilEmpresaComponent, InformacionEmpresaComponent, OfertasLaboralesComponent]
})
export class PerfilEmpresaModule {
}
