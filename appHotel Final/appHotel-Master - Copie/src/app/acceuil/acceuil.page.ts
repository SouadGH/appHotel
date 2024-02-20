import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { UtilisateurProvider } from 'src/providers/utilisateurProvider';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { PlanningProvider } from 'src/providers/planning';

import { FemmeDeMenage } from 'src/models/femmeDeMenage';
import { Room } from 'src/models/room';
import { Utilisateur } from 'src/models/utilisateurModel';
import { HttpErrorResponse } from '@angular/common/http';
import { LIEN_FICHIER_UPLOAD } from 'src/providers/config_bdd';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.page.html',
  styleUrls: ['./acceuil.page.scss'],
})
export class AcceuilPage implements OnInit {
  ListFM: FemmeDeMenage[] = [];
  public ListFMpresentes: FemmeDeMenage[] = [];
  NbrAllFM: number;
  NbrRoomsFreeDirty: number;
  NbrRoomsOccupiedDirty: number;
  roomsFreeDirty: Room[];
  roomsOccupiedDirty: Room[];
  shouldHide = true;
  chambresAbloquer: number = 0;
  TotalFM: number = 0;
  chPARfm: number = 0;
  private utilisateur: Utilisateur;
  //Ajout souad

  shouldHideupdate: boolean = false;
  shoulddisabledAnnuler: boolean = true;
  tab: FemmeDeMenage[] = [];
  public maxChambre: number = 16;

  path_base = LIEN_FICHIER_UPLOAD + "/";
  path: string;
  photos_downloaded: any;
  //////////////////

  constructor(
    private navCtrl: NavController,
    private utilisateurProvider: UtilisateurProvider,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private platform: Platform,
    private planning: PlanningProvider
  ) {
    this.ExistPlanningDay();
    // this.getListFM();
    this.getRoomsFreeDirty();
    this.getRoomsOccupiedDirty();
    try {
      if (this.router.getCurrentNavigation().extras.state.utilisateur !== undefined) {
        this.utilisateur = this.router.getCurrentNavigation().extras.state.utilisateur;
        localStorage.setItem('utilisateur', JSON.stringify(this.utilisateur));
      }
      else {
        this.utilisateur = JSON.parse(localStorage.getItem('utilisateur'));
        this.ListFMpresentes = JSON.parse(localStorage.getItem('listFM'));
      }
    }
    catch (error) {
      this.utilisateur = JSON.parse(localStorage.getItem('utilisateur'));
    }
  }

  ngOnInit() {
  }

  ExistPlanningDay() {

    this.getListFM();

    this.planning.ExistPlanningDay().subscribe(res => {

      if (res.succes == false) {
        console.log("Pas de planning pour aujourd'hui !!");
        this.shouldHideupdate = false;
        this.ListFM.forEach(element => {
          element.presence = false;
        });

      }
      else {
        console.log("le planning existe pour aujourd'hui !!");
        this.shouldHideupdate = true;
        this.shouldHide = false;
        //retourne la liste des FDC dans le planning d'aujourd'hui
        this.tab = res;
        this.ListFM.forEach(element => {
          element.presence = false;

          this.tab.forEach(fm => {
            if (fm.id_FM == element.id_FM) {
              element.presence = true;
              this.addItem(element);
            }
          });

        });
      }
    }, (err: HttpErrorResponse) => {
      console.log(err);
    });
  }
  getListFM() {
    this.planning.getAllFM().subscribe(
      res => {
        if (res.succes == false) {
          this.NbrAllFM = 0;
        } else {
          this.ListFM = res;
          console.log(res);
          this.NbrAllFM = this.ListFM.length;
          console.log("nombre total de FDC  :", this.ListFM.length);
        }
      }
    );
  }
  //Récupérer l'evenement du toggle pour activer ou désactiver la présence d'une FDC
  notify(femme: FemmeDeMenage, event) {
    console.log(" this.shouldHideupdate :", this.shouldHideupdate);

    if (event.detail.checked) {
      console.log("add");
      this.addItem(femme);
    }
    if (!event.detail.checked) {
      console.log("remove");
      this.removeItem(femme);
    }
    if (this.shouldHideupdate) {
      console.log("Faux faux ");
      this.shoulddisabledAnnuler = false;
    }
    console.log("Notify ajout toggle : ", this.ListFMpresentes);
    this.Dispatch();
  }

  notify_archive(femme: FemmeDeMenage, event) {
    if (event.checked) {
      this.removeItem(femme);
    }
    if (!event.checked) {
      this.addItem(femme);
    }
    this.Dispatch();
    console.log(this.ListFMpresentes);
  }

  //Add item from toggle and from  this.ListFMpresentes
  addItem(femme) {
    let exist = false;

    if (this.ListFMpresentes.length == 0) {
      femme.presence = true;
      this.ListFMpresentes.push(femme);
    }
    else {
      for (let i = 0; i < this.ListFMpresentes.length; i++) {
        if (this.ListFMpresentes[i].id_FM == femme.id_FM) {
          exist = true;
        }
      }
      if (!exist) {
        femme.presence = true;
        this.ListFMpresentes.push(femme);
      }
    }
    console.log("add item : : ", this.ListFMpresentes);
  }

  addItem_archive(femme) {
    let exist = false;

    if (this.ListFMpresentes.length == 0) {
      this.ListFMpresentes.push(femme);
    }
    else {

      for (let i = 0; i < this.ListFMpresentes.length; i++) {
        if (this.ListFMpresentes[i].id_FM == femme.id_FM) {
          exist = true;
        }
      }
      if (!exist) {
        this.ListFMpresentes.push(femme);
      }
    }
  }

  //Remove item from toggle and from  this.ListFMpresentes
  removeItem(femme) {
    for (let i = 0; i < this.ListFMpresentes.length; i++) {
      if (this.ListFMpresentes[i].id_FM == femme.id_FM) {
        console.log("sppression de " + femme.nom);
        this.ListFMpresentes[i].presence = false;
        this.ListFMpresentes.splice(i, 1);
      }
    }

  }

  removeItem_archive(femme) {

    for (let i = 0; i < this.ListFMpresentes.length; i++) {
      if (this.ListFMpresentes[i].id_FM == femme.id_FM) {
        console.log("sppression de " + femme.nom);
        this.ListFMpresentes.splice(i, 1);
      }
    }
  }

  //
  //Get all free dirty rooms 
  getRoomsFreeDirty() {
    this.planning.getRoomDityFree().subscribe(
      res => {
        if (res.succes == false) {
          this.NbrRoomsFreeDirty = 0;
        } else {
          this.roomsFreeDirty = res;
          console.log(res);
          this.NbrRoomsFreeDirty = this.roomsFreeDirty.length;
        }
        console.log("nombre total de chambres libre et sale  :", this.NbrRoomsFreeDirty);
      }
    );
  }

  //Get all occupied dirty rooms 
  getRoomsOccupiedDirty() {
    this.planning.getRoomDirtyOccupied().subscribe(
      res => {
        if (res.succes == false) {
          this.NbrRoomsOccupiedDirty = 0;
        } else {
          this.roomsOccupiedDirty = res;
          console.log(res);
          this.NbrRoomsOccupiedDirty = this.roomsOccupiedDirty.length;
        }
        console.log("nombre total de chambres occupées et sale :", this.NbrRoomsOccupiedDirty);
      }
    );
  }

  Dispatch() {
    let somme: number;
    somme = this.ListFMpresentes.length;

    if (somme == 0) {
      this.chambresAbloquer = (this.NbrRoomsFreeDirty + this.NbrRoomsOccupiedDirty);
    }
    else {
      this.chPARfm = (this.NbrRoomsFreeDirty + this.NbrRoomsOccupiedDirty) / (somme);

      if (this.chPARfm > this.maxChambre) {
        this.chambresAbloquer = (this.NbrRoomsFreeDirty + this.NbrRoomsOccupiedDirty) - (this.maxChambre * somme);
        this.shouldHide = true;
        if (this.shouldHideupdate) {
          this.shouldHide = false;
          console.log("update activé et il faut ajouter des FDC");
        }
      }
      if (this.chPARfm < this.maxChambre) {
        this.chambresAbloquer = 0;
        this.shouldHide = false;

        if (this.shouldHideupdate) {
          //vérifier si il ya vraiment des modifications
          this.Verify();
          // this.shouldHide = true;
        }
      }
    }
    console.log("listfm dispatch: ", this.ListFMpresentes);
  }

  Dispatch_archive() {
    let somme: number;
    somme = this.ListFMpresentes.length;

    if (somme == 0) { }
    else
      this.chPARfm = (this.NbrRoomsFreeDirty + this.NbrRoomsOccupiedDirty) / (somme);
    this.TotalFM = somme;

    if (this.chPARfm > 16) {
      this.chambresAbloquer = (this.NbrRoomsFreeDirty + this.NbrRoomsOccupiedDirty) - (16 * somme);
    }
    if (this.chPARfm < 16) {
    this.chambresAbloquer = 0;
      this.shouldHide = false;
    }
  }

  GoPlanning() {
    console.log("Goplanning FDC : ", this.ListFMpresentes);
    // alert( this.ListFMpresentes);
    //remplit la table chambresAffectees dams la bd 
    this.planning.addChambresAffectees(this.ListFMpresentes)
      .subscribe(res => {
        let resultat = res;
        // id = <string>res;
        console.log("result de insert_id demande" + resultat);
      });

    let navigationExtras: NavigationExtras = {
      state: {
        ListFM: this.ListFMpresentes,
        utilisateur: this.utilisateur
      }
    };
    this.navCtrl.navigateRoot('connecte/dispatch', navigationExtras);

    /////////////////////////////////
  }

  ShowPlanning() {
    /*  this.planning.addChambresAffectees(this.ListFMpresentes)
      .subscribe(res => {
        let resultat = res; 
       // id = <string>res;
        console.log("result de insert_id demande" + resultat);
        
      })
      ;     
     */
    /////////////////////////////////

    let navigationExtras: NavigationExtras = {
      state: { ListFM: this.ListFMpresentes }
    };
    this.navCtrl.navigateRoot('connecte/planning', navigationExtras);
  }

  GoPlanningUpdate() {
    // alert(this.ListFMpresentes); 
    console.log("Goplanningupdate FDC : ", this.ListFMpresentes);
    //Supprimer le planning du jour et insérer le nouveau
    this.planning.deleteChambresAffectees();//.subscribe(res=>{
    //console.log("Resultat de delete: ", res);
    //});
    //remplit la table chambresAffectees dams la bd 
    // this.planning.addChambresAffectees(this.ListFMpresentes);
    this.GoPlanning();
    // alert("FDC update : "+this.ListFMpresentes);
    /* .subscribe(res => {
       let resultat = res; 
       id = <string>res;
       console.log("result de insert_id demande" + id);
       
     })
     ; */
    //this.Refresh();
    /////////////////////////////////
    /*  let navigationExtras: NavigationExtras = {
        state: { ListFM: this.ListFMpresentes }
      };
      this.navCtrl.navigateRoot('connecte/dispatch', navigationExtras);*/
  }

  Refresh() {
    this.ListFMpresentes = [];
    this.tab = [];
    this.ListFM = [];

    this.ExistPlanningDay();
    this.getRoomsFreeDirty();
    this.getRoomsOccupiedDirty();
  }

  GoAnnuler() {
    console.log("Avant annuler ListFMpresentes : ", this.ListFMpresentes);
    this.ListFMpresentes = [];
    console.log("Après annuler ListFMpresentes : ", this.ListFMpresentes);
    this.Refresh();
    this.shouldHide = true;
    this.shoulddisabledAnnuler = true;
  }

  GoConsult() {
    let navigationExtras: NavigationExtras = {
      state: {
        ListFM: this.ListFMpresentes,
        utilisateur: this.utilisateur
      }
    };
    console.log("GoConsult"+ navigationExtras);
    this.navCtrl.navigateRoot('connecte/dispatch', navigationExtras);
  }

  Verify() {
    alert("Verify()");
    let exist = false;
    let total: number = 0;
    alert("TAB: " + this.tab);
    alert("ListFMpresentes: " + this.ListFMpresentes);
    /*  if(this.tab=this.ListFMpresentes){
        alert("Les memes FDM");
        exist= true;
       
      }*/
    this.ListFMpresentes.forEach(fm => {
      exist = false;
      for (let i = 0; i < this.tab.length; i++) {
        if (this.tab[i].id_FM == fm.id_FM) {
          exist = true;
          console.log(this.ListFMpresentes[i].nom, " : existe");
        }//else{ console.log(this.ListFMpresentes[i].nom," : nexiste pas");}
      }

      if (!exist) { total++; }
    });
    alert("Total est : " + total);
    if (total = 0) {
      this.shouldHide = false;
      this.shoulddisabledAnnuler = true;
    } else {
      this.shouldHide = true;
      this.shoulddisabledAnnuler = false;
    }
  }

  GoGestionFDC() {
    let navigationExtras: NavigationExtras = {
      state: {
        ListFM: this.ListFMpresentes,
        utilisateur: this.utilisateur
      }
    };
    this.navCtrl.navigateRoot('connecte/settingFDC', navigationExtras);
  }
  
  //Récupérer les photos des FDC
  exist_image(codeFDC): boolean {

    this.path = "";
    this.path = this.path_base + codeFDC.toString() + ".jpg";
    //  console.log( this.path);
    // return 
    let valeur: boolean = false;
    valeur = this.planning.exist_image(codeFDC.toString() + ".jpg");
    // console.log("exist_image de valeur: ", valeur);
    return valeur;
    /*.subscribe(
      res=>{ 
       let valeur:boolean=false;
       if(res==true){ console.log("exist_image: ", res); valeur=true;}
       else{  console.log("exist_image: ", res); valeur=false;}
       return valeur;
       
     }
    );*/
  }
}


