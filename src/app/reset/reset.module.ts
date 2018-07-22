import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ResetRoutingModule } from './reset-routing.module';
import { ResetComponent } from './reset.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    ResetRoutingModule,
    FormsModule,
  ],
  declarations: [ResetComponent]
})
export class ResetModule { }
