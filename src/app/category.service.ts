import { query } from '@angular/animations';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) {}

  public getCategories(): Observable<any[]> {
    return this.db.list('/categories', values => values.orderByChild('name')).valueChanges();
  }
}
