import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  products: {title: string, price: number, key: string}[] = [];
  filteredProducts: {title: string, price: number, key: string}[] = [];
  subscription: Subscription;

  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAllSnapshotValue().subscribe(products => {
      this.filteredProducts = this.products = products
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
  }

  filter(query: string) {
    this.filteredProducts = query ? this.products.filter(p => p.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())) : this.products;
  }
}
