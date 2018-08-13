import {AboutRoutingModule} from './about-routing.module';
import {AboutComponent} from './about.component';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    AboutRoutingModule
  ],
  declarations: [AboutComponent]
})
export class AboutModule {
}
