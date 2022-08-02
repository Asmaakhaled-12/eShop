import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/core/services/basket.service';
import { ProductService } from 'src/app/core/services/product.service';
import { UserService } from 'src/app/core/services/user.service';
import { IBasket } from '../../models/IBasket';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  userName!:string
  basket$:Observable<IBasket>
  constructor(private _UserService:UserService,private _ProductService:ProductService,private _BasketService:BasketService) {
    this.basket$=this._BasketService.basket$;
  }

  ngOnInit(): void {
  this.userName=this._UserService.userName;
  }

  removeFilteration(){
    this._ProductService.filterd=false;
  }
}
