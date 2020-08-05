import { Component, OnInit } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';

// import * as firebase from "firebase/app";
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  items: Observable<any[]>;
  itemRef: AngularFireObject<any>;
  listFiles =[];

  constructor(
    private firestore: AngularFirestore
    ,private db: AngularFireDatabase
    ,private fire:AngularFireStorage
    ) {
    // this.items = firestore.collection('items').valueChanges();
  }

  ngOnInit(){
    this.loadUsers();
    // this.loadFiles();
    // this.firestore.firestore.

    // this.items = this.firestore.collection('items').valueChanges();
    // console.log(this.items);
    
    // this.itemRef = this.db.object('galeria');

    // this.itemRef.snapshotChanges().subscribe(action => {
    //   console.log(action.type);
    //   console.log(action.key)
    //   console.log(action.payload.val())
    // });

  }

  loadUsers(){
    this.firestore.collection('usuarios').get().toPromise().then((data)=>{
      console.log("users",data);
      
    }).catch((err)=>{}).finally(()=>{});
  }

  loadMyFiles(){
    
  }

  // loadFiles(){
  //   this.listFiles= [];
  //   // console.log(firebase.auth().currentUser.email.toString());
  //   // const storageRef = firebase.storage().refFromURL('gs://nolike-gp-developer.appspot.com/');
  //   const storageRef = firebase.storage().ref();
  //   storageRef.listAll().then((data)=>{
  //     // console.log(data.prefixes);
  //     data.prefixes.forEach(ItemcarpetasU=>{
  //       // console.log(ItemcarpetasU.listAll());
  //       ItemcarpetasU.listAll().then((ItemFile)=>{
  //         console.log(ItemFile.items);
  //       }).catch((err)=>{}).finally(()=>{});
  //     });
  //     // data.items.forEach(res=>{
  //     //   console.log(res);
        
  //     //   this.listFiles.push(res);
  //     // });
  //   }).catch((err)=>{console.log(err);
  //   }).finally(()=>{});
  //   // this.fire.ref('/').
  // }

}
