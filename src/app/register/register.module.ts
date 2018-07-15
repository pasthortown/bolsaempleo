import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmpresaComponent } from './empresa/empresa.component';
import { PersonaComponent } from './persona/persona.component';

@NgModule({
  imports: [
    CommonModule,
    RegisterRoutingModule,
    FormsModule
  ],
  declarations: [RegisterComponent, EmpresaComponent, PersonaComponent]
})
export class RegisterModule { }
