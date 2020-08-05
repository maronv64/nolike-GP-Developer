import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Usuario,Archivo } from "../interfaces/todo";
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from "firebase/app";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private FireAutController:AngularFireAuth,private firestore: AngularFirestore) { }

  _login(_email:string,_clave:string){
    
    // return new Promise((resolve, reject) => {
    //       this.http.post(url+'ValidarCorreo',body.toString(), { headers: this._header})
    //         .subscribe(res => {
    //             resolve(res);
    //         }, (err) => {
    //           reject(err);
    //       });
    //   });
    
    return this.FireAutController.signInWithEmailAndPassword(_email,_clave);
            
  }

  _register(_email:string,_clave:string){
    return this.FireAutController.createUserWithEmailAndPassword(_email,_clave);
  }

  _crearUsuario(_usuario: Usuario){
    return this.firestore.collection('usuarios').add(_usuario);
  }

  _crearArchivo(_usuario: Usuario,_archivo:Archivo){

    let archivo = {

      nombre:_archivo.nombre,
      fecha:_archivo.fecha,
      ruta:_archivo.ruta,
      puntuacion: 0,

      usuario: _usuario.correo

      // usuario:{
      //   nombre:_usuario.nombre,
      //   correo:_usuario.correo,
      //   avatar:_usuario.avatar,
      // }

    };

    return this.firestore.collection('archivos').add(archivo);
  }

  _cargarArchivosTodosDeTodos(){
    return this.firestore.collection('archivos').get().toPromise();
  }

}
