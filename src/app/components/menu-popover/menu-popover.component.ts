import { Component, OnInit, Input } from '@angular/core';
import { PopoverListItem } from "../interfaces/interface";
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-menu-popover',
  templateUrl: './menu-popover.component.html',
  styleUrls: ['./menu-popover.component.scss'],
})
export class MenuPopoverComponent implements OnInit {

  @Input() list: PopoverListItem[] =[];

  constructor(
    private router:Router,
    private popoverController: PopoverController
  ) { }

  ngOnInit() {}

  onClick(item){
    console.log(item);
    this.popoverController.dismiss(item);
    this.router.navigateByUrl(item.url);
  }

}
