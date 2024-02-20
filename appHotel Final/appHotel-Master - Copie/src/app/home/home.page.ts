import { Component } from '@angular/core';
import { UtilisateurProvider } from 'src/providers/utilisateurProvider';
import { Utilisateur } from 'src/models/utilisateurModel';
import { NavParams } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Platform, NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  utilisateur: Utilisateur;
  subscription;
  constructor(
    private navCtrl:NavController,
    private utilisateurProvider: UtilisateurProvider,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private platform: Platform,
  ) {

    //console.log(this.activatedRoute.snapshot.params['utilisateur']);
    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.utilisateur = this.router.getCurrentNavigation().extras.state.utilisateur;
        console.log(this.utilisateur);
       // this.navCtrl.navigateBack('');
       //S this.navCtrl.navigateRoot('');
      }
    });
    /*this.utilisateur = this.activatedRoute.snapshot.params['utilisateur'];
    console.log(JSON.stringify(this.utilisateur));
    
    this.activatedRoute.queryParams.subscribe(data=>{
    console.log(data);
    
    });*/

    /*this.utilisateurProvider.getUtilisateur_ID(2).then(data=>{
console.log("OK");
      this.utilisateur=<Utilisateur>data;
      console.log();
      
      console.log(this.utilisateur);
      
    }).catch(_=>{
      console.log("Mort");
      
    });*/
  }

  ionViewDidEnter() {
    if (this.platform.is('mobile')) {
      this.subscription = this.platform.backButton.subscribe(() => {
        navigator['app'].exitApp();
      });      
    }
  }

  ionViewWillLeave() {
    if (this.platform.is('mobile')) {
      this.subscription.unsubscribe();
    }

  }
}
