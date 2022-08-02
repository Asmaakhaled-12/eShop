import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { filter, observable } from 'rxjs';
import { ProductService } from 'src/app/core/services/product.service';
import { IProduct } from 'src/app/shared/models/IProduct';

@Component({
  selector: 'app-filiter',
  templateUrl: './filiter.component.html',
  styleUrls: ['./filiter.component.scss'],
})
export class FiliterComponent implements OnInit {
  @ViewChild('minElementRef') minInput!: ElementRef;
  @ViewChild('maxElementRef') maxInput!: ElementRef;

  minPrice: number = this._ProductService.minPrice;
  maxPrice: number = this._ProductService.maxPrice;

  productsFiliterd: IProduct[] = [];
  constructor(
    private _ProductService: ProductService,
    private _Router: Router
  ) {}

  ngOnInit(): void {}

  filiter() {
    this._ProductService.filterd = true;
    this._ProductService.minPrice = this.minPrice;
    this._ProductService.maxPrice = this.maxPrice;
    this._Router.navigate(['/products/productList']);
  }
}
