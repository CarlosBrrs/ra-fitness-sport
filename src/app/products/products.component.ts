import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { firstValueFrom, Observable, take } from 'rxjs';
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

  constructor(private productService: ProductService, private storage: AngularFireStorage) {
    this.products$ = productService.getAllSnapshotValue() as Observable<Product[]>;
    this.products$.subscribe(pa => {
      pa.forEach(p => {
        let pathReference = this.storage.refFromURL(p.imageUrl);
        firstValueFrom(pathReference.getDownloadURL()).then((url: string) => {
          p.imageUrl = url;
          this.imageLoaded = true;
        });
      })
    });
  };
}

