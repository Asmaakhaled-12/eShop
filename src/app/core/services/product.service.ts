import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, from, map, Observable, take } from 'rxjs';
import { IProduct } from 'src/app/shared/models/IProduct';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUrl=environment.apiUrl;

  //fillteration
  minPrice:number=50;
  maxPrice:number=350;
  filterd:boolean=false;

  constructor(private _HttpClient:HttpClient) {
   }

  getAll():Observable<IProduct[]>{
      return this._HttpClient.get<IProduct[]>(`${environment.apiUrl}/products`)
  }

  getById(productId:number):Observable<IProduct>{
    return this._HttpClient.get<IProduct>(`${environment.apiUrl}/products/${productId}`);
  }

  update(product:IProduct,productId:number):Observable<IProduct>{
    return this._HttpClient.patch<IProduct>(`${environment.apiUrl}/products/${productId}`,product);
  }

}
