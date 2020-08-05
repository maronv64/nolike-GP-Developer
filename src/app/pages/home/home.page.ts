import { Component, OnInit } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';

// import * as firebase from "firebase/app";
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from 'src/app/services/auth.service';
import { Archivo } from "../../interfaces/todo";

import { Plugins } from "@capacitor/core";

// import {  } from "file-saver";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  items: Observable<any[]>;
  itemRef: AngularFireObject<any>;
  itemList : AngularFireList<any>;
  listFiles : any[] =[];

  constructor(
    private firestore: AngularFirestore
    ,private db: AngularFireDatabase
    ,private fire:AngularFireStorage
    ,private FireBaseService : AuthService
    // ,private transfer: FileTransfer
    // , private file: File
    ) {
    // this.items = firestore.collection('items').valueChanges();
    
  }

  // fileTransfer: FileTransferObject = this.transfer.create();

  ngOnInit(){
    this.loadUsers();
    this.loadFiles();
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

  loadFiles(){

    // let lista = this.firestore.collection('usuarios').snapshotChanges().subscribe(data=>{data.map(e=>{ console.log(e.payload.doc.data());});
    // });

    // this.firestore.collection('archivos').snapshotChanges().subscribe(
    //   data=>{
    //     data.map(item=>{
    //       console.log("hhhh",item.payload.doc.data());
          
    //     })
    //   }
    // );

    // this.firestore.collection('archivos').get().toPromise().then(data=>{
    //   data.forEach(i=>{
    //     console.log('hjdkaskdhsakjd',i.data());
    //   })
    // })

    // console.log("Lista",lista);
    
    
    

    this.FireBaseService._cargarArchivosTodosDeTodos()
        .then((dataFiles)=>{
          dataFiles.forEach(item=>{
            this.listFiles.push( item.data());
          })
        }).catch((err)=>{

        }).finally(()=>{
          console.log("ListaFiles",this.listFiles);
          
        });
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
