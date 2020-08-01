import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';

import { AngularFireModule } from '@angular/fire';
// import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../../../environments/environment';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
    ,AngularFireModule.initializeApp(environment.firebaseConfig),
    // AngularFireAnalyticsModule,
    AngularFirestoreModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
