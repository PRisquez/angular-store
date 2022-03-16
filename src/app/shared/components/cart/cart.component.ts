import { Component } from "@angular/core";
import { ShoppingCartService } from "../../services/shopping-cart.service";

@Component({
    selector: 'app-cart',
    template: `
    <ng-container *ngIf="{ total: total$ | async, quantity: quantity$ | async} as dataCart">
        <ng-container *ngIf="dataCart.total">
            <mat-icon>shopping_cart</mat-icon>
            {{ dataCart.total | currency:'EUR' }}
            ({{ dataCart.quantity }})
        </ng-container>
    </ng-container>
    `,

})
export class CartComponent{
    quantity$ = this._shoppingCartService.quatityAction$
    total$ = this._shoppingCartService.totalAction$
  
    constructor(private _shoppingCartService: ShoppingCartService){  }
}