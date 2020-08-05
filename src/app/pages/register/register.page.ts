import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { imageIcon } from "../../../environments/environment";
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(
    private router : Router
    ,private authService:AuthService
  ) { 
    this.ngFormRegister = new FormGroup({
      _usuario : new FormControl({value:'',disabled:false},[Validators.email,Validators.required]),
      _clave : new FormControl({value:'',disabled:false},[Validators.required])
    });
  }

  ngOnInit() {
  }

  ngFormRegister:FormGroup;
  image:string = imageIcon;

  register(){
    //este servicio crea un usuario de autenticacion
    this.authService._register(this.ngFormRegister.get('_usuario').value,this.ngFormRegister.get('_clave').value)
    .then(dataAuth=>{
      console.log('register',dataAuth);
      localStorage.setItem('usuario',this.ngFormRegister.get('_usuario').value);
      localStorage.setItem('clave',this.ngFormRegister.get('_clave').value);
      //este servicio crea un usuario en la base de datos para relacionarlo con los archivos
      this.authService._crearUsuario({
        nombre: this.ngFormRegister.get('_usuario').value,
        correo: this.ngFormRegister.get('_usuario').value,
      }).then((dataDB)=>{
        console.log('usuario creado en la base de datos');
        
      }).catch((err)=>{
        
      }).finally(()=>{});

      this.router.navigateByUrl('/tabs/home');
    }).catch(err=>{
      console.log(err);
      //return err;
    }).finally(()=>{});
  }

}
