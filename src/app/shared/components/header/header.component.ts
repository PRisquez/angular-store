import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'app-header',
  template: `
    <mat-toolbar color="primary" class="header">
      <a [routerLink]="['/']"><span>My Application</span></a>
      <a class="mouseHover" [routerLink]="['/checkout']"><span><app-cart></app-cart></span></a>
    </mat-toolbar>
  `,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private _router: Router){  }

  goToCheckout():void {
    this._router.navigate(['/checkout']);
  }
}
