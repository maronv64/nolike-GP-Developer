import { Component, OnInit } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  items: Observable<any[]>;
  itemRef: AngularFireObject<any>;

  constructor(private firestore: AngularFirestore,private db: AngularFireDatabase) {
    // this.items = firestore.collection('items').valueChanges();
  }

  ngOnInit(){

    // this.firestore.firestore.

    this.items = this.firestore.collection('items').valueChanges();
    console.log(this.items);
    
    this.itemRef = this.db.object('galeria');

    this.itemRef.snapshotChanges().subscribe(action => {
      console.log(action.type);
      console.log(action.key)
      console.log(action.payload.val())
    });

  }

}
