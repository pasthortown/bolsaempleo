import {AccountRoutingModule} from './account-routing.module';
import {AccountComponent} from './account.component';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {UserService} from '../../services/user.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    AccountRoutingModule
  ],
  declarations: [AccountComponent],
  providers: [UserService],
})
export class AccountModule {
}
