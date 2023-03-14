import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { from, lastValueFrom, map, Observable, switchMap } from 'rxjs';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$: Observable<any[]>;
  file!: File;
  downloadURL$: Observable<any> = new Observable<any>;
  imageLoaded = false;
  imagenURL: any;

  constructor(private router: Router, private categoryService: CategoryService, private productService: ProductService, private storage: AngularFireStorage) {
    this.categories$ = categoryService.getCategories().snapshotChanges();
  }

  public async save(product: any) {
    try {
      const url = await this.guardarImagen(this.file, product.category);
      product.imageUrl = url;
      console.log(product);
      await this.productService.create(product);
      this.router.navigate(['/admin/products']);
    } catch (error) {
      console.log('Error al crear el producto:', error);
    }
  }
  
  async guardarImagen(file: File, category: string): Promise<string> {
    const filePath = `${category}/${file.name}`;
    const fileRef = this.storage.ref(filePath);
    await fileRef.put(file).task;
    this.downloadURL$ = fileRef.getDownloadURL();
    return lastValueFrom(this.downloadURL$);
  }

  capturarImg(event: any): void {
    this.file =  event.target.files[0];
    const lectorImagen = new FileReader();

    lectorImagen.onload = () => {
      this.imagenURL = lectorImagen.result;
      this.imageLoaded = true;
    }
    console.log(this.imagenURL)
    lectorImagen.readAsDataURL(this.file);
  }

  mostrarImg() {
    return this.file;
  }

  ngOnInit(): void {
  }
}
