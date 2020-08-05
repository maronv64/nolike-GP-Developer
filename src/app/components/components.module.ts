import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { MessageboxComponent } from "./messagebox/messagebox.component";
import { MenuPopoverComponent } from './menu-popover/menu-popover.component';

@NgModule({
  declarations: [MessageboxComponent,MenuPopoverComponent],
  imports: [
    CommonModule,IonicModule
  ],
  exports:[MenuPopoverComponent],
  providers:[MessageboxComponent,MenuPopoverComponent] //MenuPopoverComponent
})
export class ComponentsModule { }
