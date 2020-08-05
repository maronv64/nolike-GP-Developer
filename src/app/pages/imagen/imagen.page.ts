import { Component, OnInit } from '@angular/core';
// import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { LoadingController } from '@ionic/angular';
import { imageIcon } from 'src/environments/environment';
import { Plugins,CameraResultType,CameraOptions, CameraSource } from "@capacitor/core";
import { AngularFireStorage } from "@angular/fire/storage";

import { MessageboxComponent } from "../../components/messagebox/messagebox.component";

import { AuthService } from "../../services/auth.service";

import * as firebase from "firebase/app";

const { Camera } = Plugins;

@Component({
  selector: 'app-imagen',
  templateUrl: './imagen.page.html',
  styleUrls: ['./imagen.page.scss'],
})



export class ImagenPage implements OnInit {

  image:string = imageIcon;
  principalIcon :string = 'cloud-upload';
  listPrincipalIcon = ['cloud-upload','save'];

  selectedPhoto;
  // currentImage;

  imagebase64 ;

  listImagenes =[];
  proto;

  constructor(//private camera: Camera,
              private messagebox : MessageboxComponent
              ,private storage:AngularFireStorage
              ,private firebaseDataBaseService: AuthService
              // ,private file:File
              ) {}

  // options: CameraOptions = {
  //   quality: 100,
  //   destinationType: this.camera.DestinationType.FILE_URI,
  //   encodingType: this.camera.EncodingType.JPEG,
  //   mediaType: this.camera.MediaType.PICTURE
  // };

  ngOnInit() {
    console.log(this.listPrincipalIcon);
    
    this.principalIcon = this.listPrincipalIcon[0];
    
  }


  async takePicture() {
    const image = await Camera.getPhoto({
      promptLabelPhoto : 'Usar la Galeria',
      promptLabelPicture: 'Usar la Camara',
      quality: 100,
      allowEditing: true,
      resultType: CameraResultType.Base64,
      source : CameraSource.Camera
    });
    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    var imageUrl = image.base64String;
    // Can be set to the src of an image now
    // imageElement.src = imageUrl;
    this.selectedPhoto = 'data:image/jpeg;base64,' + imageUrl;

    const rawData = atob(image.base64String);
    const bytes = new Array(rawData.length);
    for (var x = 0; x < rawData.length; x++) {
        bytes[x] = rawData.charCodeAt(x);
    }
    const arr = new Uint8Array(bytes);
    const blob = new Blob([arr], {type: 'image/png'});
    this.imagebase64 = blob;
    // this.imagebase64 = image.base64String;
    // this.selectedPhoto =this.imagebase64;
    this.principalIcon = this.listPrincipalIcon[1];

    // this.storage.upload

  }

  async selectGalery(){
    const image = await Camera.getPhoto({
      promptLabelPhoto : 'Usar la Galeria',
      promptLabelPicture: 'Usar la Camara',
      quality: 100,
      allowEditing: true,
      resultType: CameraResultType.Base64,
      source : CameraSource.Photos,
      // saveToGallery: true
    });
    
    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    var imageUrl = image.base64String;
    // Can be set to the src of an image now
    // imageElement.src = imageUrl;
    this.selectedPhoto = 'data:image/jpeg;base64,' + imageUrl;

    const rawData = atob(image.base64String);
    const bytes = new Array(rawData.length);
    for (var x = 0; x < rawData.length; x++) {
        bytes[x] = rawData.charCodeAt(x);
    }
    const arr = new Uint8Array(bytes);
    const blob = new Blob([arr], {type: 'image/png'});
    this.imagebase64 = blob;
    // this.imagebase64 = image.base64String;
    // this.selectedPhoto =this.imagebase64;
    this.principalIcon = this.listPrincipalIcon[1];

  }

  urlRuta : string = '';
   saveImage(){
    // this.messagebox.presentToastWithButtons(this.selectedPhoto);
    // console.log(this.imagebase64);

    
    if (this.principalIcon=='save') {
      console.log('save imgage');
      const ramdomId = Math.random();
      this.storage.upload(`${localStorage.getItem('usuario')}/arch_${ramdomId}`,this.imagebase64)
          .then(data=>{
            
            this.saveImageInBD(data);

            // const storageRef = firebase.storage().ref(`${localStorage.getItem('usuario')}/${ramdomId}`);
            // storageRef.getDownloadURL().then((url)=>{console.log("delaotrafirma",url)});
            
          }).catch(err=>{
            this.messagebox.presentToastWithButtons();
          }).finally(()=>{
            this.principalIcon==this.listPrincipalIcon[0];
            this.selectedPhoto = this.image;
          });
    }
  }

  saveImageInBD(data:firebase.storage.UploadTaskSnapshot){

    data.ref.getDownloadURL()
      .then(url=>{ 
        this.urlRuta = url; console.log('urlDownload',this.urlRuta);

        console.log("algo raro pasa",this.urlRuta);
             
        this.firebaseDataBaseService._crearArchivo(
          {
            nombre: localStorage.getItem('usuario'),
            correo: localStorage.getItem('usuario'),
          },
          {
            nombre: data.metadata.name,
            fecha: data.metadata.timeCreated,
            ruta:  this.urlRuta,
          }
        ).then((dataDB)=>{
            console.log('archivo creado en la base de datos');
            this.messagebox.presentToastWithButtons({header:'mensaje:',message:'Imagen Subida!'});
          }).catch((err)=>{
            
          }).finally(()=>{ this.urlRuta = ''; });

      }).catch((err)=>{

      }).finally(()=>{
        
      });

    

    
  }

}
