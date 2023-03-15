import { Component, OnInit } from '@angular/core';
import { take, lastValueFrom, Observable, firstValueFrom } from 'rxjs';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ActivatedRoute, Router } from '@angular/router';

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
  product: any = {};
  productId: string;

  constructor(private route: ActivatedRoute, private router: Router, private categoryService: CategoryService, private productService: ProductService, private storage: AngularFireStorage) {
    this.categories$ = categoryService.getCategoriesShapshotChanges();
    this.productId = this.route.snapshot.paramMap.get('id') as string;
  }

  public async save(product: any) {
    try {
      const url = await this.saveImg(this.file, product.category);
      product.imageUrl = url;
      console.log(product);
      await this.productService.create(product);
      this.router.navigate(['/admin/products']);
    } catch (error) {
      console.log('Error al crear el producto:', error);
    }
  }

  async saveImg(file: File, category: string): Promise<string> {
    const filePath = `${category}/${file.name}`;
    const fileRef = this.storage.ref(filePath);
    await fileRef.put(file).task;
    this.downloadURL$ = fileRef.getDownloadURL();
    return lastValueFrom(this.downloadURL$);
  }

  catchImg(event: any): void {
    this.file = event.target.files[0];
    const lectorImagen = new FileReader();

    lectorImagen.onload = () => {
      this.imagenURL = lectorImagen.result;
      this.imageLoaded = true;
    }
    lectorImagen.readAsDataURL(this.file);
  }

  ngOnInit(): void {
    if (this.productId) {
      this.productService.getValueChanges(this.productId).pipe(take(1)).subscribe(p => {
        this.product = p
        const pathReference = this.storage.refFromURL(this.product.imageUrl);
        firstValueFrom(pathReference.getDownloadURL()).then((url: string) => {
          this.imagenURL = url;
          this.imageLoaded = true;
        }).catch((error) => {
          console.log(error);
        });
      });
    };
  }
}
