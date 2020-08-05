import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ToastOptions } from "@ionic/core/dist";

@Component({
  selector: 'app-messagebox',
  templateUrl: './messagebox.component.html',
  styleUrls: ['./messagebox.component.scss'],
})



export class MessageboxComponent implements OnInit {

  constructor(private toastController: ToastController) { }

  ngOnInit() {}

  toastOp:ToastOptions={
    animated: true,
    color: 'dark',
    cssClass: 'toast-success',
    duration: 3000,
    header: 'Error:',
    keyboardClose: true,
    message: 'Ha ocurrido un error intente nuevamente.',
    mode: 'ios',
    position: 'bottom',
    translucent: false
  };

  public async presentToastWithButtons(t:ToastOptions={
    animated: true,
    color: 'dark',
    cssClass: 'toast-success',
    duration: 3000,
    header: 'Error:',
    keyboardClose: true,
    message: 'Ha ocurrido un error intente nuevamente.',
    mode: 'ios',
    position: 'bottom',
    translucent: false
  }){

    const toast = await this.toastController.create({
      animated: true,
      buttons: [
        {
          side: 'start',
          icon: 'alert',
          text: '',
          handler: () => {
            console.log('Favorite clicked');
          }
        }, {
          text: '',
          role: 'cancel',
          icon: 'close',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ],
      color:          t.color         || this.toastOp.color,
      cssClass:       t.cssClass      || this.toastOp.cssClass,
      duration:       t.duration      || this.toastOp.duration,
      header:         t.header        || this.toastOp.header,
      keyboardClose:  t.keyboardClose || this.toastOp.keyboardClose,
      message:        t.message       || this.toastOp.message,
      mode:           t.mode          || this.toastOp.mode,
      position:       t.position      || this.toastOp.position,
      translucent:    t.translucent   || this.toastOp.translucent
    });
    toast.present();
  }
}
