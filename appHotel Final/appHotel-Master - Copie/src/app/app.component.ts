import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  UTILISATEUR_CONSTANTE = "utilisateurAppHotel";

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private navCtrl: NavController,
    private router: Router,
    private storage: Storage,
  ) {
    this.initializeApp();
    this.gestionConnexion();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // alert('Success'); // THIS RUNS
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  gestionConnexion() {
    //this.router.navigate('/connecte/home/');

    
    this.storage.get(this.UTILISATEUR_CONSTANTE).then(data => {
      if (data) {
        console.log("Quelqu'un");
        console.log(data);
        this.navCtrl.navigateRoot('connecte/acceuil');
        //this.navCtrl.setRoot();
      } else {
        console.log("Personne");
        this.navCtrl.navigateRoot('connexion');
      }
    }).catch(_ => {
      console.log("Erreur");

    });


  }
}
