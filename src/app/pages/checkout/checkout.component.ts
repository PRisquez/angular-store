import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { delay, switchMap, tap } from 'rxjs/operators';
import { Order, DetailsOrder, Details } from 'src/app/shared/interface/order.interface';
import { Store } from 'src/app/shared/interface/store.interface';
import { DataService } from 'src/app/shared/services/data.service';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { Product } from '../products/product/interfaces/product.interface';
import { ProductsService } from '../products/services/products.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  model = {
    name: '',
    store: '',
    shippingAddress: '',
    city: ''
  };

  isDelivery: boolean = true;
  cart: Product[] = [];
  stores: Store[] = [];

  constructor(
    private _dataService: DataService,
    private _shoppingCart: ShoppingCartService,
    private _productService: ProductsService,
    private _router: Router
    ) { 
      this.checkIfCartIsEmpty(); 
    }

  ngOnInit(): void {
    this.getStores();
    this.getCartData();
  }

  onPickupOrDelivery(value: boolean):void {
    this.isDelivery = value;
  }

  onSubmit({ value: formData }:NgForm):void{
    const data: Order = {
      ...formData,
      date: this.getCurrentDate(),
      isDelivery: this.isDelivery,
    }
    this._dataService.saveOrder(data)
    .pipe(
      tap( res => console.log('Oder ',res)),
      switchMap(({id: orderId}: Order) => {
        const details: Details[] = this.prepareDetails();
        return this._dataService.saveDetailsOrder({details, orderId})        
      }),
      tap(() => this._router.navigate(['/checkout/thank-you-page'])),
      delay(2000),
      tap(()=>this._shoppingCart.resetCart())
    )
    .subscribe();
  }

  private getStores():void {
    this._dataService.getStores()
    .pipe(tap((stores: Store[]) => this.stores = stores))
    .subscribe();
  }

  private getCurrentDate():string {
    return new Date().toLocaleDateString();
  }

  private prepareDetails(): Details[]{
    const details: Details[] = [];
    this.cart.forEach((product: Product)=>{
      const { id: productId, name: productName, qty: quantity, stock } = product;
      const updateStock = (stock - quantity);
      this._productService.updateStockProduct(product, updateStock)
      .pipe(tap(()=>details.push(detail)))
      .subscribe();
      const detail: Details = {
        productId,
        productName,
        quantity
      }
      
    });
    return details;
  }

  private getCartData(): void {
    this._shoppingCart.cartAction$
    .pipe(tap((products: Product[]) => this.cart = products))
    .subscribe();
  }

  private checkIfCartIsEmpty():void {
    this._shoppingCart.cartAction$
    .pipe(tap((products: Product[])=>{if(!products.length) this._router.navigate(['/products'])}))
    .subscribe();
  }

}
