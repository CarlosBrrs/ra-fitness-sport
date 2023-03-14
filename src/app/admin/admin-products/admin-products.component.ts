import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  products$: Observable<any[]>;

  constructor(private productService: ProductService) {
    this.products$ = this.productService.getAll().snapshotChanges();
  }

  ngOnInit(): void {
  }



}
