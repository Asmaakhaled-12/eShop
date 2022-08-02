import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { UserNameComponent } from './components/user-name/user-name.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { FilterProductByPricePipe } from './pipes/filter-product-by-price.pipe';


@NgModule({
  declarations: [
    UserNameComponent,
    NavbarComponent,
    FilterProductByPricePipe,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule,
    ToastrModule.forRoot(),
    HttpClientModule
  ],
  exports:
  [
    CommonModule,
    UserNameComponent,
    NavbarComponent,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule,
    HttpClientModule,
    FilterProductByPricePipe,


  ]
})
export class SharedModule { }
