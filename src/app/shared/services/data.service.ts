import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DetailsOrder, Order } from '../interface/order.interface';
import { Store } from '../interface/store.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiURL = environment.apiURL;

  constructor(private _http: HttpClient) { }

  getStores(): Observable<Store[]> {
    return this._http.get<Store[]>(`${this.apiURL}/stores`);
  }

  saveOrder(order: Order): Observable<Order>{
    return this._http.post<Order>(`${this.apiURL}/orders`,order)
  }

  saveDetailsOrder(detailsOrder: DetailsOrder): Observable<DetailsOrder>{
    return this._http.post<DetailsOrder>(`${this.apiURL}/detailsOrders`,detailsOrder)
  }
}
