import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$: Observable<any[]>;

  constructor(categoryService: CategoryService, private productService: ProductService) {
    this.categories$ = categoryService.getCategories().snapshotChanges();
  }

  public save(product: NgForm) {
    this.productService.create(product)
  }

  ngOnInit(): void {
  }

}
