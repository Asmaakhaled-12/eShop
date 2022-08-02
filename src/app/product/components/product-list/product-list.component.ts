import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';
import { IProduct } from 'src/app/shared/models/IProduct';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products:IProduct[]=[];
  productId:string|null=null;
  min:number=this._ProductService.minPrice;
  max:number=this._ProductService.maxPrice;
  filterd=this._ProductService.filterd;
  constructor(private _ProductService:ProductService,private _Router:Router,private _ActivatedRoute:ActivatedRoute) {
      console.log(this.min,this.max,this._ProductService.minPrice);
  }

  ngOnInit(): void {
    this._ProductService.getAll().subscribe((data)=>{
      this.products=data;
})
}

  navigate(productID:number)
  {
      this._Router.navigate(['/products/productDetails',productID])
  }

}
