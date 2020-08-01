import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { imageIcon } from "../../../environments/environment";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  ngFormLogin:FormGroup;

  constructor(private router : Router) {

    this.ngFormLogin = new FormGroup({
      _usuario : new FormControl({value:'',disabled:false},[Validators.email,Validators.required]),
      _clave : new FormControl({value:'',disabled:false},[Validators.required])
    });

   }

  ngOnInit() {
  }

  login(){
    this.router.navigateByUrl('/tabs/home');
  }

  image:string = imageIcon;

}
