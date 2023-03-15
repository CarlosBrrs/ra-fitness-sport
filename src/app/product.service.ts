import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { NgForm } from '@angular/forms';

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

  getAllSnapshot() {
    return this.db.list('/products').snapshotChanges();
  }

  getValueChanges(productId: string) {
    return this.db.object('/products/' + productId).valueChanges();
  }
}
