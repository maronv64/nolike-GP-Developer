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
      _usuario : new FormControl({value:'',disabled:false},[Validators.email,Validators.required]),
      _clave : new FormControl({value:'',disabled:false},[Validators.required])
    });

   }

  ngOnInit() {
  }

  login(){
    this.authService._login(this.ngFormLogin.get('_usuario').value,this.ngFormLogin.get('_clave').value)
        .then(data=>{
          console.log(data);
          this.router.navigateByUrl('/tabs/home');
        }).catch(err=>{
          console.log(err);
          //return err;
        }).finally(()=>{});
    
  }

  image:string = imageIcon;

}
