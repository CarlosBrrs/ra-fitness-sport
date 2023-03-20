import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map, Observable } from 'rxjs';
import { Product } from './models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  public async create(product: any): Promise<void> {
    this.db.list('/products').push(product);
  }

  public async update(product: any, productId: string): Promise<void> {
    return this.db.object('/products/' + productId).update(product);
  }

  public delete(productId: string): Promise<void> {
    return this.db.object('/products/' + productId).remove();
  }

  getAllSnapshotValue(): Observable<any[]> {
    return this.db.list('/products').snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() as Product[]}))
      )
    );
  }

  getValueChanges(productId: string) {
    return this.db.object('/products/' + productId).valueChanges();
  }
}
