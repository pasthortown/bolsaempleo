import { PerfilRoutingModule } from './perfil-routing.module';
import { PerfilComponent } from './perfil.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpresaComponent } from './empresa/empresa.component';
import { PersonaComponent } from './persona/persona.component';

@NgModule({
  imports: [
    CommonModule,
    PerfilRoutingModule
  ],
  declarations: [PerfilComponent, EmpresaComponent, PersonaComponent]
})
export class PerfilModule { }
