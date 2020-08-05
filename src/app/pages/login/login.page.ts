import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { imageIcon } from "../../../environments/environment";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  ngFormLogin:FormGroup;

  constructor(
    private router : Router
    ,private authService:AuthService
  ) {

    this.ngFormLogin = new FormGroup({
      _usuario : new FormControl({value:'jorgexo.ox@gmail.com',disabled:false},[Validators.email,Validators.required]),
      _clave : new FormControl({value:'kiritokun',disabled:false},[Validators.required])
    });

   }

  ngOnInit() {

  }

  navigate(){
    this.router.navigateByUrl('/register');
  }

  login(){
    this.authService._login(this.ngFormLogin.get('_usuario').value,this.ngFormLogin.get('_clave').value)
        .then(data=>{
          console.log(data);
          localStorage.setItem('usuario',this.ngFormLogin.get('_usuario').value);
          localStorage.setItem('clave',this.ngFormLogin.get('_clave').value);
          this.router.navigateByUrl('/tabs/home');
        }).catch(err=>{
          console.log(err);
          //return err;
        }).finally(()=>{});
    
  }

  image:string = imageIcon;

}
