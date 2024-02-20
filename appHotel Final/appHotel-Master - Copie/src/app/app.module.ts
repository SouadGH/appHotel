import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { UtilisateurProvider } from 'src/providers/utilisateurProvider';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { PlanningProvider } from 'src/providers/planning';

import { Camera } from '@ionic-native/Camera/ngx';
import { File } from '@ionic-native/File/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
//dragual
//import {DragulaModule} from 'ng2-dragula';
import { DragulaModule, DragulaService }   from 'ng2-dragula';
import { SingleRoomOptionsPageModule } from './menu/single-room-options/single-room-options.module';
import { ChambresAffecteesOptionsPageModule } from './dispatch/chambresaffecteesoptions.module';
//import { DragulaModule, DragulaService } from '../../node_modules/ng2-dragula/ng2-dragula';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    DragulaModule.forRoot(),
    SingleRoomOptionsPageModule,
    ChambresAffecteesOptionsPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    UtilisateurProvider,
    PlanningProvider,
    Camera,
    File,
    WebView,
    FilePath,
    DragulaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
