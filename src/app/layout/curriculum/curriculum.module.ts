import {CurriculumRoutingModule} from './curriculum-routing.module';
import {CurriculumComponent} from './curriculum.component';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {PostulanteService} from '../../services/postulante.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    CurriculumRoutingModule
  ],
  declarations: [CurriculumComponent],
  providers: [PostulanteService],
})
export class CurriculumModule {
}
