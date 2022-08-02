import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/core/services/basket.service';
import { IProduct } from 'src/app/shared/models/IProduct';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  basket$:Observable<any>;
  constructor(private _BasketService:BasketService,private _ToastrService:ToastrService) {
    this.basket$=this._BasketService.basket$;
    this.basket$.subscribe(Response=>{
      console.log(Response)
    })


   }

  ngOnInit(): void {
  }

  remove(product:IProduct){
    this._BasketService.remove(product)
    this._ToastrService.info("Removed",undefined,{positionClass: 'toast-bottom-right'});
  }

  increment(product:IProduct){
    this._BasketService.increment(product);
    if(this._BasketService.outOfStock){
      this._ToastrService.error("out Of  Stock",undefined,{positionClass: 'toast-bottom-right'});
    }
  }

  decrement(product:IProduct){
    this._BasketService.decrement(product);
  }
}
