import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  //{ path: 'base', component:AppComponent },

  { path: 'connexion', loadChildren: './connexion/connexion.module#ConnexionPageModule' },
  { path:'connecte', children:[
     // { path: 'home', loadChildren: './home/home.module#HomePageModule' },
      { path: 'acceuil', loadChildren: './acceuil/acceuil.module#AcceuilPageModule' },
      { path: 'dispatch', loadChildren: './dispatch/dispatch.module#DispatchPageModule' },
      { path: 'planning', loadChildren: './femmedemenage/femmedemenage.module#FemmedemenagePageModule' },
      { path: 'settingFDC', loadChildren: './setting-fdc/setting-fdc.module#SettingFDCPageModule' },
      { path: 'reaffecter', loadChildren: './reaffecter/reaffecter.module#ReaffecterPageModule' },
  ]},
  { path: 'options-room', loadChildren: './menu/options-room/options-room.module#OptionsRoomPageModule' },
  { path: 'single-room-options', loadChildren: './menu/single-room-options/single-room-options.module#SingleRoomOptionsPageModule' },
  { path: 'chambres-affectees-options', loadChildren: './dispatch/chambresaffecteesoptions.module#ChambresAffecteesOptionsPageModule'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
