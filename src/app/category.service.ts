import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) {}

  public getAallShapshot() {
    return this.db.list('/categories', values => values.orderByChild('name')).snapshotChanges();
  }
  
}



