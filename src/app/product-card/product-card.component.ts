import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/product';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Input('product') product!: Product;
  @Input('show-actions') showActions: boolean = true;
  @Input('imageUrl') imageUrl!: string;
  
  constructor() { }

}
