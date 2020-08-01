import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { LoadingController } from '@ionic/angular';
import { imageIcon } from 'src/environments/environment';

@Component({
  selector: 'app-imagen',
  templateUrl: './imagen.page.html',
  styleUrls: ['./imagen.page.scss'],
})



export class ImagenPage implements OnInit {

  image:string = imageIcon;

  selectedPhoto;
  currentImage;

  constructor(private camera: Camera,
              private loadingController: LoadingController
              ) { }

  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };

  ngOnInit() {

  }

  grabPicture() {


    this.camera.getPicture(this.options).then((imageData) => {
      
      this.presentLoading();

      this.selectedPhoto  = this.dataURItoBlob('data:image/jpeg;base64,' + imageData);
      // this.selectedPhoto = 'data:image/jpeg;base64,' + imageData;
      // this.upload();
    }, (err) => {
      console.log('error', err);
    });
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Espere un momento',
      duration: 2000,
      spinner: 'bubbles'
    });
    await loading.present();
  }

  dataURItoBlob(dataURI) {
    // codej adapted from:
    //  http://stackoverflow.com/questions/33486352/
    //cant-upload-image-to-aws-s3-from-ionic-camera
        let binary = atob(dataURI.split(',')[1]);
        let array = [];
        for (let i = 0; i < binary.length; i++) {
          array.push(binary.charCodeAt(i));
        }
        return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
  };

}
