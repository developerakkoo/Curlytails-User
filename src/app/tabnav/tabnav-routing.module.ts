import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabnavPage } from './tabnav.page';
import { HomePageModule } from '../home/home.module';

const routes: Routes = [
  {
    path: 'tabnav',
    component: TabnavPage,
    children:[
      {
        path:'home',
        loadChildren:() => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'explore',
    loadChildren: () => import('../explore/explore.module').then( m => m.ExplorePageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then( m => m.ProfilePageModule)
      },
      {
        path: 'favorite',
        loadChildren: () => import('../favorite/favorite.module').then( m => m.FavoritePageModule)
      },
    ]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/tabnav/home',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabnavPageRoutingModule {}
