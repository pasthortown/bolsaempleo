import { ResetRoutingModule } from './reset-routing.module';
import { ResetComponent } from './reset.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ResetRoutingModule,
    FormsModule
  ],
  declarations: [ResetComponent]
})
export class ResetModule {
}
