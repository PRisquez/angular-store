import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  total$ = this._shoppingCartService.totalAction$;
  cart$ = this._shoppingCartService.cartAction$;

  constructor(private _shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
  }

}
