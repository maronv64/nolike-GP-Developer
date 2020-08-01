import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path:'home',
        children:[
          {path:'',loadChildren:()=>import('../pages/home/home.module').then(m => m.HomePageModule)}
        ]
      },
      {
        path:'imagen',
        children:[
          {path:'',loadChildren:()=>import('../pages/imagen/imagen.module').then(m => m.ImagenPageModule)}
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
