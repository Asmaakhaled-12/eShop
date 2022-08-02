import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../models/IProduct';

@Pipe({
  name: 'filterProductByPrice'
})
export class FilterProductByPricePipe implements PipeTransform {

  transform(products:IProduct[],filiterd:boolean, min:number,max:number): IProduct[] {
    if(filiterd) return products.filter(product=>product.price>=min&&product.price<=max);
    else return products;
  }

}
