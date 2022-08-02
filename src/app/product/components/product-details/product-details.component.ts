import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/core/services/basket.service';
import { ProductService } from 'src/app/core/services/product.service';
import { IProduct } from 'src/app/shared/models/IProduct';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  productId:any;
  product!:IProduct;
  basket$:Observable<any>
  constructor(private _ActivatedRoute:ActivatedRoute,private _ProductService:ProductService,private _BasketService:BasketService,private _ToastrService:ToastrService) {
    this.basket$=this._BasketService.basket$;
}

  ngOnInit(): void {
      this.productId=this._ActivatedRoute.snapshot.paramMap.get('id');
      this._ProductService.getById(+this.productId).subscribe((data)=>{
          this.product=data;
      });

      this._BasketService.refreshProduct.subscribe(()=>{
        this._ProductService.getById(+this.productId).subscribe((data)=>{
          this.product=data;
      });
      })
  }

  addItemToBasket(product:IProduct){
    console.log("product",product);
    this._BasketService.addItemToBasket(product);
    console.log("product",product);

    this._ToastrService.success(
     'Added Successfully !!',
     undefined,
     {
       positionClass: 'toast-bottom-right',
     }
   );
  }



}
