import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { from, lastValueFrom, map, Observable, switchMap } from 'rxjs';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$: Observable<any[]>;
  file!: File;

  constructor(categoryService: CategoryService, private productService: ProductService, private storage: AngularFireStorage) {
    this.categories$ = categoryService.getCategories().snapshotChanges();
  }

  public async save(product: any) {
    try {
      const url = await this.guardarImagen(this.file, product.category);
      product.imageUrl = url;
      console.log(product);
      await this.productService.create(product);
    } catch (error) {
      console.log('Error al crear el producto:', error);
    }
  }
  
  async guardarImagen(file: File, category: string): Promise<string> {
    const filePath = `${category}/${file.name}`;
    const fileRef = this.storage.ref(filePath);
    await fileRef.put(file).task;
    const downloadURL$ = fileRef.getDownloadURL();
    return lastValueFrom(downloadURL$);
  }

  capturarImg(event: any): void {
    this.file =  event.target.files[0];
  }

  ngOnInit(): void {
  }
}
