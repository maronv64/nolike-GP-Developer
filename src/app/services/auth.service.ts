import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private FireAutController:AngularFireAuth) { }

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

}
