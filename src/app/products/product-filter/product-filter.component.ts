import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/category.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {

  categories$: Observable<any[]>
  @Input('category') category: any;

  constructor(private categoryService: CategoryService) {
    this.categories$ = categoryService.getAallShapshot();
  }

  ngOnInit(): void {
  }

}
