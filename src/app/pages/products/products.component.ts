import { Component, OnInit } from '@angular/core';
import { ProductsService } from './services/products.service';
import {tap} from 'rxjs/operators'
import { Product } from './product/interfaces/product.interface';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public products!: Product[];

  constructor(private _productService: ProductsService, private _shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    this._productService.getProducts()
    .pipe(tap((products) => this.products = products)
    )
    .subscribe();

  }

  addToCart(product: Product): void {
    this._shoppingCartService.updateCart(product)
    
  }

}
