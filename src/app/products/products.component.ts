import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom, Observable } from 'rxjs';
import { CategoryService } from '../category.service';
import { Product } from '../models/product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  imagenURL: any;
  imageLoaded = false;
  categories$: Observable<any[]>
  category!: string;

  constructor(route: ActivatedRoute, private categoryService: CategoryService, private productService: ProductService, private storage: AngularFireStorage) {
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
    this.categories$ = categoryService.getAallShapshot();
    
  }
}

