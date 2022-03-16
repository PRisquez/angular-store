import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Product } from "src/app/pages/products/product/interfaces/product.interface";

@Injectable({
    providedIn: 'root'
})
export class ShoppingCartService{
    products: Product[] = [];
    private cartInitialValue:[] = [];
    private totalInitialValue: number = 0;
    private quantityInitialValue: number = 0;

    private cartSubject = new BehaviorSubject<Product[]>(this.cartInitialValue);
    private totalSubject = new BehaviorSubject<number>(this.totalInitialValue);
    private quantitySubject = new BehaviorSubject<number>(this.quantityInitialValue);

    get cartAction$():Observable<Product[]>{
        return this.cartSubject.asObservable();
    }

    get totalAction$():Observable<number>{
        return this.totalSubject.asObservable();
    }

    get quatityAction$():Observable<number>{
        return this.quantitySubject.asObservable();
    }

    updateCart(product: Product):void {
        this.addToCart(product);
        this.calcQuantity();
        this.caclTotal();
    }

    resetCart():void {
        this.cartSubject.next(this.cartInitialValue);
        this.totalSubject.next(this.totalInitialValue);
        this.quantitySubject.next(this.quantityInitialValue);
        this.products = [];
    }

    private addToCart(product:Product):void {
        const isProductInCart = this.products.find(({id}) => id === product.id);

        if(isProductInCart) {
            isProductInCart.qty += 1;
        }else {
            this.products.push({...product, qty:1});
        }

        this.cartSubject.next(this.products);
    }

    private caclTotal():void {
        const total = this.products.reduce((acc, prod) => acc+=(prod.price * prod.qty), 0);
        this.totalSubject.next(total);
    }

    private calcQuantity():void {
        const quantity = this.products.reduce((acc, prod) => acc+=prod.qty, 0);
        this.quantitySubject.next(quantity);
    }
}