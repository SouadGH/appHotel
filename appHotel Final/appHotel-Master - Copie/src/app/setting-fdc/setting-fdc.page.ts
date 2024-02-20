import { Component, OnInit } from '@angular/core';
import { Utilisateur } from 'src/models/utilisateurModel';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { PlanningProvider } from 'src/providers/planning';
import { UtilisateurProvider } from 'src/providers/utilisateurProvider';
import { FemmeDeMenage } from 'src/models/femmeDeMenage';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-setting-fdc',
  templateUrl: './setting-fdc.page.html',
  styleUrls: ['./setting-fdc.page.scss'],
})
export class SettingFDCPage implements OnInit {
  ListFM :FemmeDeMenage[]= [];
  public utilisateur: Utilisateur;
  NbrAllFM: number; 
  public disponible :any ="dispo";
  public boutonActiverDesactiver:any="Désactiver";
  constructor(  private navCtrl:NavController,
    private utilisateurProvider: UtilisateurProvider,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private platform: Platform, 
    private planning: PlanningProvider,
    public alertController: AlertController) { 
    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        //this.ListFM = this.router.getCurrentNavigation().extras.state.ListFM; 
        this.utilisateur = this.router.getCurrentNavigation().extras.state.utilisateur;         
       }
    }); 
    this.disponible="dispo";
    this.boutonActiverDesactiver="Désactiver";
    this.getListFM(); 
  }

  ngOnInit() {
  }
  checkMaster(event) {
  
    if (event.detail.value=="dispo"){
       this.disponible="dispo"; 
       this.boutonActiverDesactiver="Désactiver";}
    else
    
    { this.disponible="nondispo";
      this.boutonActiverDesactiver="Activer";
   }
  
    this.getListFM();
    
     
  }
  getListFMnodispo(){
  
    this.planning.getAllFM_desactiver().subscribe(
      res=>{
        if (res.succes == false) {
          this.NbrAllFM  = 0;
        } else {
         this.ListFM = res;
         console.log(res);
         this.NbrAllFM = this.ListFM.length;    
         console.log("nombre total de FDC desactiver :",   this.ListFM.length);
        }      
      }
    ); 
  
  }
  getListFM(){
    //alert(this.disponible);
    //Afficher que la liste des FDC nondisponible
  
     if(this.disponible =="nondispo"){
       this.getListFMnodispo();     
    
  }
  else  //Afficher que la liste des FDC  disponible
  {
    this.planning.getAllFM().subscribe(
      res=>{
        if (res.succes == false) {
          this.NbrAllFM  = 0;
        } else {
         this.ListFM = res;
         console.log(res);
         this.NbrAllFM = this.ListFM.length;    
         console.log("nombre total de FDC disponible  :",   this.ListFM.length);
         //this.disponible="dispo";
        }      
      }
    ); 
  }   
  }
  async AlertDelete(femme:FemmeDeMenage){
    if(this.boutonActiverDesactiver=="Desactiver"){
      const alert = await this.alertController.create({
        header: 'Supression',
        message: 'Vouler-vous vraiment désactiver le compte de <strong>'+femme.nom +' '+ femme.prenom +'</strong>!!!',
        buttons: [
          {
            text: 'Annuler',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Supprimer',
            handler: () => {
              this.delete(femme);
              console.log('Confirm Suppression');
            }
          }
        ]
      });
  
      await alert.present();
    }
    else{
      const alert = await this.alertController.create({
        header: 'Supression',
        message: 'Vouler-vous vraiment activer le compte de <strong>'+femme.nom +' '+ femme.prenom +'</strong>!!!',
        buttons: [
          {
            text: 'Annuler',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Supprimer',
            handler: () => {
              this.activer(femme);
              console.log('Confirm Suppression');
            }
          }
        ]
      });
  
      await alert.present();
    }

  }
  delete(femme:FemmeDeMenage){
    //alert(femme.nom +" à désactiver");
    this.planning.desactiverFDC(femme.id_FM).subscribe();    
  }
  activer(femme:FemmeDeMenage){
    //alert(femme.nom +" à activer");
    this.planning.activerFDC(femme.id_FM).subscribe();    
  }
  AlertUpdater(femme:FemmeDeMenage){
   // alert(femme +" à modifier");
   
    this.planning.updateFDC(femme).subscribe();  
  //  this.planning.updateFDC(femme);  
  }
  async AlertUpdate(femme:FemmeDeMenage){
    let fdc :FemmeDeMenage;
    fdc = femme;
    let bol :boolean;
    if(fdc.is_active ){bol=true;}else{bol =false;}
    const alert = await this.alertController.create({
      header: 'Modifier',
      inputs: [
        {
         
          name: 'nom',
          type: 'text',
          value: fdc.nom,
          placeholder: 'Nom'
        },
        {
          name: 'prenom',
          type: 'text',
          id: 'name2-id',
          value: fdc.prenom,
          placeholder: 'Prénom'
        },
        {
          name: 'etage',
          value: fdc.etage,
          type: 'text',
          placeholder: 'Etage'
        },
        ,
        {
          name: 'secteur',
          value: fdc.secteur,
          type: 'text',
          placeholder: 'Secteur'
        },
        {
          name: 'code',
          value: fdc.code,
          type: 'text',
          placeholder: 'Code'
        },
        ,
        {
          name: 'is_active',
          value: fdc.is_active,
          type: 'text',
          placeholder: 'Active ?'
        },
        {
          placeholder: 'Active ?',
          name: 'is_actives',
          type: 'checkbox',
          label: 'checkbox',
          value: bol,          
          checked: bol
        },
        // input date with min & max
        {
          name: 'name4',
          type: 'date',
          min: '2017-03-01',
          max: '2018-01-12'
        },
        // input date without min nor max
        {
          name: 'name5',
          type: 'date'
        },
        {
          name: 'name6',
          type: 'number',
          min: -5,
          max: 10
        },
        {
          name: 'name7',
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (alertData) => {
          // console.log("alertData.is_active: ",alertData.is_active);
           //fdc.nom = alert.inputs[0].value.toString();
            fdc.nom = alertData.nom;
            fdc.prenom = alertData.prenom;
            fdc.secteur = alertData.secteur;
            fdc.etage = alertData.etage;
            fdc.code = alertData.code;
            fdc.is_active = alertData.is_active;
          /* if(alertData.is_active.unchecked)
           { fdc.is_active = false; }
            
           if(alertData.is_active.checked)
               { fdc.is_active = true; }*/
          
           
            console.log('fdc alert update : ',fdc);
            this.AlertUpdater(fdc);
            alertData = null;
            this.getListFM();           
          }
        }
      ]
    });

    await alert.present();
  }
  async AlertAddFDC(){
    let fdc : FemmeDeMenage; // = null;
    
   
    
    const alert = await this.alertController.create({
      header: 'Ajouter',
      inputs: [
        {
         
          name: 'nom',
          type: 'text',
         // value: fdc.nom ,
          placeholder: 'Nom'
        },
        {
          name: 'prenom',
          type: 'text',
          id: 'name2-id',
         // value: fdc.prenom,
          placeholder: 'Prénom'
        },
        {
          name: 'etage',
         // value: fdc.etage,
          type: 'text',
          placeholder: 'Etage'
        },
        ,
        {
          name: 'secteur',
         // value: fdc.etage,
          type: 'text',
          placeholder: 'Secteur'
        },
        {
          name: 'code',
         // value: fdc.code,
          type: 'text',
          placeholder: 'Code'
        },
        ,
        {
          name: 's',
         // value: fdc.is_active,
          type: 'text',
          placeholder: 'Active ?'
        },
        {
          placeholder: 'Active ?',
          name: 'is_active',
          type: 'checkbox',
          label: 'checkbox',
         // value: bol,          
         // checked: bol
        },/*
        // input date with min & max
        {
          name: 'name4',
          type: 'date',
          min: '2017-03-01',
          max: '2018-01-12'
        },
        // input date without min nor max
        {
          name: 'name5',
          type: 'date'
        },
        {
          name: 'name6',
          type: 'number',
          min: -5,
          max: 10
        },
        {
          name: 'name7',
          type: 'number'
        }*/
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (alertData) => {
            this.AddFDC(alertData.nom,alertData.prenom,alertData.etage,alertData.secteur,alertData.code,true,false);         
          
            this.getListFM();    
            alertData = null;           
          }
        }
      ]
    });

    await alert.present();
  }

 AddFDC(nom,prenom,etage,secteur,code,is_active,presence){   
    this.planning.addFDC(nom,prenom,etage,secteur,code,is_active,presence).subscribe();  
  
  }
}
