import { NgModule } from '@angular/core';

import { CoreRoutingModule } from './core-routing.module';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from '../shared/shared.module';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CoreRoutingModule,
    SharedModule,
    ToastrModule
  ]
})
export class CoreModule { }
