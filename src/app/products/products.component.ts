import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom, Subscription } from 'rxjs';
import { Product } from '../models/product';
import { ProductService } from '../product.service';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  imagenURL: any;
  imageLoaded = false;
  category!: string;
  cart: any;
  subscription!: Subscription;

  constructor(route: ActivatedRoute, private productService: ProductService, private storage: AngularFireStorage, private cartService: ShoppingCartService) {

    productService.getAllSnapshot().subscribe(products => {
      this.filteredProducts = this.products = products;
      this.filteredProducts.forEach(p => {
        let pathReference = this.storage.refFromURL(p.imageUrl);
        firstValueFrom(pathReference.getDownloadURL()).then((url: string) => {
          p.imageUrl = url;
          this.imageLoaded = true;
        });
      })
      route.queryParamMap.subscribe(params =>{
        this.category = params.get('category') || '';
        this.filteredProducts = (this.category !== '') ?
          this.products.filter(p => this.category === p.category) : this.products
      });
    });
    
    
  }

  async ngOnInit() {
    this.subscription = (await this.cartService.getCart()).valueChanges().subscribe(cart => this.cart = cart);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

