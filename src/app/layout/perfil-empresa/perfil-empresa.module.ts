import {PerfilEmpresaRoutingModule} from './perfil-empresa-routing.module';
import {PerfilEmpresaComponent} from './perfil-empresa.component';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CommonModule} from '@angular/common';
import {InformacionEmpresaComponent} from './informacion-empresa/informacion-empresa.component';
import {OfertasLaboralesComponent} from './ofertas-laborales/ofertas-laborales.component';
import {EmpresaService} from '../../services/empresa.service';
import {ProfesionalesComponent} from './profesionales/profesionales.component';


@NgModule({
  imports: [
    CommonModule,
    PerfilEmpresaRoutingModule,
    NgbModule,
    FormsModule
  ],
  declarations: [PerfilEmpresaComponent, InformacionEmpresaComponent, OfertasLaboralesComponent, ProfesionalesComponent],
  providers: [EmpresaService]
})
export class PerfilEmpresaModule {
}
