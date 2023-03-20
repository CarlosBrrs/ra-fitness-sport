import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom, Observable, take } from 'rxjs';
import { CategoryService } from '../category.service';
import { Product } from '../models/product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  products$: Observable<Product[]>
  imagenURL: any;
  imageLoaded = false;
  categories$: Observable<any[]>
  category!: string;

  constructor(route: ActivatedRoute, private categoryService: CategoryService, private productService: ProductService, private storage: AngularFireStorage) {
    this.products$ = productService.getAllSnapshot() as Observable<Product[]>;
    this.products$.subscribe(pa => {
      pa.forEach(p => {
        let pathReference = this.storage.refFromURL(p.imageUrl);
        firstValueFrom(pathReference.getDownloadURL()).then((url: string) => {
          p.imageUrl = url;
          this.imageLoaded = true;
        });
      })
    });
    this.categories$ = categoryService.getAallShapshot();
    route.queryParamMap.subscribe(params =>{
      this.category = params.get('category') || '';
    });
  }
}

