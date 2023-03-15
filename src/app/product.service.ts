import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product: NgForm) {
    this.db.list('/products').push(product);
  }

  getAllSnapshot() {
    return this.db.list('/products').snapshotChanges();
  }

  getValueChanges(productId: string) {
    return this.db.object('/products/' + productId).valueChanges();
  }
}
