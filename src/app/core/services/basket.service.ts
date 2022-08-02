import { HttpClient } from '@angular/common/http';
import { isNgTemplate } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Basket, IBasket } from 'src/app/shared/models/IBasket';
import { IProduct } from 'src/app/shared/models/IProduct';
import { environment } from 'src/environments/environment';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  outOfStock:boolean=false;
  refreshProduct=new BehaviorSubject<any>(false);
  private basketSource = new BehaviorSubject<any>(null);
  basket$=this.basketSource.asObservable();
  constructor(private _HttpClient:HttpClient,private _ProductService:ProductService) { }


  createBasket(){
    const basket=new Basket();
    localStorage.setItem('basketId',basket.id);
    this.setBasket(basket);
    return basket;

  }

  setBasket(basket:IBasket){
    this._HttpClient.post(`${environment.apiUrl}/basket`,basket).subscribe((response)=>{
      this.basketSource.next(response);
    })
  }

  updateBasket(basketId:string,basket:IBasket){
      return this._HttpClient.put(`${environment.apiUrl}/basket/${basketId}`,basket).subscribe(Response=>{
        this.basketSource.next(Response);
      })
  }

  getBasket(id:string):Observable<any>{
      return this._HttpClient.get<IBasket>(`${environment.apiUrl}/basket/${id}`).pipe(
        map((basket:IBasket)=>{
            this.basketSource.next(basket)
     })
      )
  }

  getCurrentBasket():IBasket{
    return this.basketSource.value;
  }


  addItemToBasket(productToAdd:IProduct,quantity:number=1)
  {
    const basket=this.getCurrentBasket()??this.createBasket();
    const items=this.addOrUpdateItem(basket.items,productToAdd);
    basket.items=items;
    this.updateBasket(basket.id,basket);
    console.log(basket);
  }


  addOrUpdateItem(items:IProduct[],productToAdd:IProduct){
    let newProduct=productToAdd;
    this.decrementQunatintyOfProduct(productToAdd);

    let productToAddIndex = items.findIndex((i) => i.id == productToAdd.id);

    if (productToAddIndex == -1) {
     newProduct.quantity= 1;
      items.push(newProduct);
    }
    else {
      items[productToAddIndex].quantity++;
    }
    return items;
  }


   decrementQunatintyOfProduct(productToDecrementQuantity:IProduct){
     productToDecrementQuantity.quantity--;
    this._ProductService.update(productToDecrementQuantity,productToDecrementQuantity.id).subscribe(()=>{
          this.refreshProduct.next(true);
    });

   }

  increment(item:IProduct){
    const basket=this.getCurrentBasket();
    let productIndex=basket.items.findIndex(i=>i.id==item.id);

    this._ProductService.getById(item.id).subscribe(product=>{
      if(product.quantity==0){ this.outOfStock==true; return}
      else
      {
        this.outOfStock=false;
        basket.items[productIndex].quantity++;
        product.quantity--;
        this._ProductService.update(product,product.id).subscribe(next=>{
          this.updateBasket(basket.id,basket)
        });

      }
    })
  }


  decrement(item:IProduct){
    if(item.quantity==1){
      this.remove(item);
      return;
    }
    else{
      const basket=this.getCurrentBasket();
      let productIndex=basket.items.findIndex(i=>i.id==item.id);
      basket.items[productIndex].quantity--;
      this._ProductService.getById(item.id).subscribe(product=>{
        this.updateBasket(basket.id,basket);
        product.quantity++;
        this._ProductService.update(product,product.id).subscribe();
      })
    }
  }

  remove(item:IProduct){
      const basket=this.getCurrentBasket();
      let items=basket.items.filter(product=>product.id!=item.id);
      this._ProductService.getById(item.id).subscribe(product=>{
        basket.items=items;
        this.updateBasket(basket.id,basket);
        product.quantity+=item.quantity;
        this._ProductService.update(product,product.id).subscribe();

      })
  }



}



