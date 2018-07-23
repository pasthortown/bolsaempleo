import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PersonaRoutingModule } from './persona-routing.module';
import { PersonaComponent } from './persona.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    PersonaRoutingModule,
    FormsModule,
    NgbModule
  ],
  declarations: [PersonaComponent]
})
export class PersonaModule { }
