import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../product/interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = environment.apiURL;
  constructor(private _http: HttpClient) { }

  getProducts():Observable<Product[]> {
    return this._http.get<Product[]>(`${this.apiUrl}/products`);
  }

  updateStockProduct(product: Product, stock: number):Observable<any>{
    const body = {"stock": stock}
    return this._http.patch<any>(`${this.apiUrl}/products/${product.id}`,body);
  }
}
