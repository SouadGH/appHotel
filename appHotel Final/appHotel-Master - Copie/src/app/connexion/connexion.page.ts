import { Component, OnInit } from '@angular/core';
import { Utilisateur } from 'src/models/utilisateurModel';
import { UtilisateurProvider } from 'src/providers/utilisateurProvider';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController, Platform, AlertController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { FemmeDeMenage } from 'src/models/femmeDeMenage';
import { PlanningProvider } from 'src/providers/planning';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.page.html',
  styleUrls: ['./connexion.page.scss'],
})
export class ConnexionPage implements OnInit {

  public ListFM: FemmeDeMenage[] = [];
  code: string;

  donnees: { telephone: string, nom_utilisateur: string, mot_de_passe: string } = { telephone: '', nom_utilisateur: '', mot_de_passe: '' };

  //donnees: { telephone: string, nom_utilisateur: string, mot_de_passe: string };
  /* les variables qui gèrent les 3 inputs */
  telephone: string;
  nom_utilisateur: string;
  mot_de_passe: string;

  /* si les données sont corrects, l'utilisateur sera instancié */
  utilisateur: Utilisateur;

  /* le tableau parcouru pour afficher les labels */
  messagesErreur: string[];

  /* constantes pour les erreurs */
  ERREUR_INCOMPLET = "Le formulaire est incomplet";
  ERREUR_DONNEES = "Il y a une erreur dans les données";

  subscription;
  constructor(
    private navCtrl:NavController,
    private router: Router,
    private utilisateurProvider: UtilisateurProvider,
    private platform: Platform,
    private planning: PlanningProvider,
    public alertController: AlertController
    //private formBuilder: FormBuilder,

  ) {

    this.code = " ";
      // this.getAllUsers();
    /* this.donnees = this.formBuilder.group({
       telephone: ['', Validators.required],
       nom_utilisateur: [''],
       mot_de_passe: [''],
     });

    this.donnees.telephone = this.code;
    this.donnees.nom_utilisateur = 'annesottas';
    this.donnees.mot_de_passe = '1234';
  */
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

  code1(i: string) {
    this.code = this.code + "" + i;
    // console.log(i);
  }

  ngOnInit() {
    //console.log(ok);
  }

  formulaireComplet() {
    if (!this.donnees.telephone ||
      !this.donnees.nom_utilisateur ||
      !this.donnees.mot_de_passe) {
      return false;
    }
    return true;
  }

  deleteCode(){
    this.code = "";
  }

  seConnecter() {

    if (this.code.trim() == "") {
      this.presentAlert();
      return ;
    }

    this.messagesErreur = [];
    this.donnees.telephone = this.code;
    // console.log("===yyyyyy=========", this.donnees.telephone);

    this.utilisateurProvider.getUtilisateur_MOTDEPASSE(parseInt(this.code)).then(data => {
      this.utilisateur = <Utilisateur>data;

      this.messagesErreur.push(this.utilisateur.nom);
      this.messagesErreur.push(this.utilisateur.prenom);
      /*console.log(this.utilisateur);
      this.router.navigateByUrl('/connecte/home/' + this.utilisateur);*/

      let navigationExtras: NavigationExtras = {
        state: {
          utilisateur: this.utilisateur
        }
      };
      //this.router.navigate(['/connecte/home/'], navigationExtras);
      // console.log ("===============");
      // console.log (this.utilisateur);
      // console.log ("===============");

      if (this.utilisateur.is_gouvernante) {
          this.navCtrl.navigateRoot('connecte/acceuil', navigationExtras);
      }
      else {
          this.getFDC (this.utilisateur.mot_de_passe);
          
      }
      //this.navCtrl.navigateRoot('');

      //this.navCtrl.pop();
      //this.router.navigateByUrl('');
      //this.navCtrl.setR
      //this.router.
    }).catch(_ => {
      this.messagesErreur.push(this.ERREUR_DONNEES);
          //console.log("Presenting alert");
          this.presentAlert();
          this.code="";
    });

  }

  async presentAlert() {
    console.log("Presenting alert");
    const alert = await this.alertController.create({
      cssClass: 'custom-alert-danger',
      header: 'Erreur connexion',
      subHeader: 'Code faux',
      message: 'Verifier votre code et réessayer.',
      buttons: ['OK']
    });

    await alert.present();
  }

  getFDC(code) {
          // console.log ("======code=========");
          // console.log (code);
          // console.log ("=======code========");
    this.planning.getFDC(code).subscribe(
      res => {
        if (res.success == false) {
          
        }
        else {
         // console.log ("======res=========");
         // console.log (res);
         //  console.log ("=======res========");
          this.ListFM = res ;

          let navigationExtras: NavigationExtras = {
            state: {
              ListFM: this.ListFM,
              utilisateur: this.utilisateur
            }
          };

          // console.log ("======dddddd=========");
          // console.log (this.ListFM);
          // console.log ("=======dddddd========");
          this.navCtrl.navigateRoot('connecte/dispatch', navigationExtras);
        }
      }
    );
  }

}
