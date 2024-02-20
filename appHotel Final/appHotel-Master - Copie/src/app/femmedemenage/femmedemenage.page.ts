import { Component, OnInit, ViewChild } from '@angular/core';
import { PlanningProvider } from 'src/providers/planning';
import { FemmeDeMenage } from 'src/models/femmeDeMenage';
import { Utilisateur } from 'src/models/utilisateurModel';
import { NavController, Platform, ActionSheetController } from '@ionic/angular';
import { UtilisateurProvider } from 'src/providers/utilisateurProvider';
import { Router, ActivatedRoute } from '@angular/router';
import { Room } from 'src/models/room';

import { Subscription, interval } from "rxjs";
import { CameraOptions, Camera } from '@ionic-native/Camera/ngx';
import { HttpErrorResponse } from '@angular/common/http';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-femmedemenage',
  templateUrl: './femmedemenage.page.html',
  styleUrls: ['./femmedemenage.page.scss'],
})
export class FemmedemenagePage {

  @ViewChild('doughnutCanvas') doughnutCanvas;

  doughnutChart: any;
  ListFM: FemmeDeMenage[] = [];
  NbrAllFM: number;
  utilisateur: Utilisateur;

  NbrAllRooms: number;
  allRooms: Room[];
  public Etage2: Room[];
  public Etage3: Room[];
  public Etage4: Room[];
  public base64Image: string;
  public photos: string[];
  public planningExist: boolean = false;

  private interval: any;
  private observableVar: Subscription;

  NbrRoomsFreeDirty: number;
  NbrRoomsFreeClean: number;
  NbrRoomsOccupiedDirty: number;
  NbrRoomsOccupiedClean: number;
  NbrRoomsHS: number;
  roomsFreeDirty: Room[];
  roomsFreeClean: Room[];

  roomsOccupiedDirty: Room[];
  roomsOccupiedClean: Room[];
  roomsHS: Room[];
  constructor(private navCtrl: NavController,
    private utilisateurProvider: UtilisateurProvider,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private platform: Platform,
    private planning: PlanningProvider,
    public actionSheet: ActionSheetController, private camera: Camera
  ) {

    // this.getListFM();

    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.utilisateur = this.router.getCurrentNavigation().extras.state.utilisateur;
        // console.log(this.utilisateur);
      }
    });

    this.rafraichir();
    //  this.refreshData();
  }
  public doughnutChartLabels: string[] = ["Libre propre", "Libre sale", "Occupée sale", "Occupée propre"];
  public doughnutChartData: number[] = [this.NbrRoomsFreeClean, this.NbrRoomsFreeDirty, this.NbrRoomsOccupiedDirty, this.NbrRoomsOccupiedClean];
  public doughnutChartType: string = "doughnut";


  ngOnInit() {
    //this.observableVar = interval(10000).subscribe(() => {
      // console.log("Refreshing DATA now");
      this.refreshData();
    //});
  }
  
  rafraichirRooms() {
    this.NbrRoomsFreeDirty = 0;
    this.NbrRoomsFreeClean = 0;
    this.NbrRoomsOccupiedDirty = 0;
    this.NbrRoomsOccupiedClean = 0;
    this.NbrRoomsHS = 0;


    this.getAllRooms();
    this.getRoomsFreeDirty();
    this.getRoomsFreeClean();
    this.getRoomsOccupiedDirty();
    this.getRoomsOccupiedClean();
    this.getRoomsHS();
    this.graph();
  }
  ionViewDidLeave() {
    this.observableVar.unsubscribe();
  }

  ionViewWillEnter() {
    this.refreshData();
    // console.log("Refreshing DATA now");
    //------------------------------------------------------------------------------------------
    //enlever d'ici, pour le mettre dans un bouton en bas de page (footer) qui fait le refresh:
    //------------------
    /*
    this.interval = setInterval(() => {
      this.refreshData();
      // console.log("Refreshing DATA 2 now");
    }, 10000);
    */
  }
  rafraichirDonnees(){
    //this.interval = setInterval(() => {
      this.refreshData();
      // console.log("Refreshing DATA 2 now");
   // }, 10000);
  }

  refreshData() {
    this.refreshPageComtent();
    this.rafraichirRooms();
  }


  refreshPageComtent() {
    this.rafraichir()
  }
  graph() {
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ["Libre propre", "Libre sale", "Occupée propre", "Occupée sale", "Hors service"],
        datasets: [{
          label: '# of Votes',
          data: [this.NbrRoomsFreeClean, this.NbrRoomsFreeDirty, this.NbrRoomsOccupiedClean, this.NbrRoomsOccupiedDirty, this.NbrRoomsHS],
          backgroundColor: [
            'rgba(82, 182, 64)',
            'rgba(255, 0, 0)',
            'rgba(255, 206, 86)',
            'rgba(255, 255, 128)',
            'rgba(127, 127, 127)'
          ],
          hoverBackgroundColor: [
            "rgba(82, 182, 64, 0.2)",
            "rgba(255, 0, 0, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(255, 255, 128, 0.2)",
            "rgba(127, 127, 127, 0.2)"
          ]
        }]
      }

    });
  }
  /* getListFM() {
     this.planning.getAllFM().subscribe(
       res => {
         if (res.succes == false) {
           this.NbrAllFM = 0;
         } else {
           this.ListFM = res;
           console.log(res);
           this.NbrAllFM = this.ListFM.length;
           console.log("nombre total de chambres  :", this.ListFM.length);
         }
       }
     );
   }*/

  //Get all rooms
  getAllRooms() {
    this.planning.getAllRooms().subscribe(
      res => {

        if (res.succes == false) {
          this.NbrAllRooms = 0;

        } else {
          this.allRooms = res;
          console.log(res);
          this.NbrAllRooms = this.allRooms.length;
          //this.graph();       

          // console.log("nombre total de chambres  :", this.allRooms.length);
          this.repartirParEtage(2);
          this.repartirParEtage(3);
          this.repartirParEtage(4);

        }
      }
    );
  }

  //Repartir par etage
  repartirParEtage(floor: number) {

    this.planning.getRoomFloorId(floor).subscribe(
      res => {

        if (res.succes == false) {
          alert("Cette étage n'existe pas !!!");
        } else {
          if (floor == 2) { this.Etage2 = res; }
          if (floor == 3) { this.Etage3 = res; }
          if (floor == 4) { this.Etage4 = res; }

          console.log("nombre total de chambres Etage :", floor, "est :", res.length);
        }

      }
    );
  }
  //Plannibg du jour exsite
  ExistPlanningDay() {

    this.planning.ExistPlanningDay().subscribe(res => {

      if (res.succes == false) {
        console.log("Pas de planning pour aujourd'hui !!");
        this.planningExist = false;
      }
      else {
        console.log("le planning existe pour aujourd'hui !!");
        //retourne la liste des FDC dans le planning d'aujourd'hui
        this.planningExist = true;
      }
    }, (err: HttpErrorResponse) => {
      console.log(err);
    });
  }
  
  

  //Jorge  Etat des chambres
  async presentActionSheet(chambre: Room) {
    const actionSheet = await this.actionSheet.create({
      header: 'Define the room ' + chambre.room_num + ' statut : ',
      cssClass: 'myActionSheet',
      buttons: [
        {
          text: 'Propre',
          icon: 'checkmark-circle',
          cssClass: 'propreIcon',
          handler: () => {
            //chambre.isClean = false;
            //this.chambreService.chambreList = this.chambreList.slice();
            this.MiseAPropre(chambre.room_num, chambre.Etat);
          }
        },
        {
          text: 'Sale',
          icon: 'close',
          cssClass: 'saleIcon',
          handler: () => {
            alert("Mise en Sale dune chambre .");
            this.MiseEnSale(chambre.room_num, chambre.Etat);
            //  chambre.isClean = false;
            //   this.chambreService.chambreList = this.chambreList.slice();
          }
        },
        {
          //Ce bouton il faut le désactiver pour les femmes de ménage
          text: 'Hors service',
          icon: 'construct',
          cssClass: 'hsIcon',
          handler: () => {
            this.MiseEnHS(chambre.room_num, chambre.Etat);
            //  chambre.isClean = false;
            //   this.chambreService.chambreList = this.chambreList.slice();
          },
        },
        {
          text: 'Recouche',
          icon: 'checkmark-circle',
          cssClass: 'recoucheIcon',
          handler: () => {
            //chambre.isClean = true;
            //this.chambreService.chambreList = this.chambreList.slice();
          }
        },
        {
          text: 'Annoncer un problème',
          cssClass: 'problemeIcon',
          icon: 'alert',
          handler: () => {
            this.MiseEnProbleme(chambre.room_num, chambre.Etat);
          }
        },
        {
          text: 'Chambre prioritaire',
          icon: 'star',
          cssClass: 'prioritaireIcon',
          handler: () => {
            this.MiseEnPriorite(chambre.room_num, chambre.Etat);
          }
        },
        {
          text: '__________________________________________'
        },
        {
          text: 'Problème résolu',
          icon: 'done-all',
          handler: () => {
            this.MiseEnSansProbleme(chambre.room_num, chambre.Etat);
          }
        },
        {
          text: 'Non prioritaire',
          icon: 'remove-circle',
          handler: () => {
            this.MiseEnSansPriorite(chambre.room_num, chambre.Etat);
          }
        },
        {
          text: '__________________________________________'
        },
        {
          text: 'Vérification gouvernante',
          icon: 'done-all',
          handler: () => {
            this.MiseEnGouvernanteChecked(chambre.room_num, chambre.Etat);
          }
        },
        {
          text: 'Annuler vérification gouvernante',
          icon: 'remove-circle',
          handler: () => {
            this.MiseEnSansGouvernanteChecked(chambre.room_num, chambre.Etat);
          }
        }
      ]
    });
    await actionSheet.present();
  }

  //Passer la chambre à propre dans la table csv et la table chambresAffecttees
  MiseAPropre(Room_num, Etat) {
    this.planning.MiseAPropreRoom(Room_num, Etat).subscribe(
      res => {
        //Rafraichir l'affichage    
        this.rafraichir();
        //console.log("La chambre est passée à propre :");
      }
    );
  }
  //Passer la chambre à sale dans la table csv et la table chambresAffecttees
  MiseEnSale(Room_num, Etat) {
    alert("Mise en Sale dune chambre dans le provider." + Room_num);
    this.planning.MiseASaleRoom(Room_num, Etat).subscribe(
      res => {
        //Rafraichir l'affichage    
        alert(" Résultat Mise en Sale dune chambre provider." + res);
        this.rafraichir();
        // console.log("La chambre est passée à propre :");
      }
    );
  }

  //Passer la chambre en HS dans la table csv et la table chambresAffecttees
  MiseEnHS(Room_num, Etat) {
    this.planning.MiseHsRoom(Room_num, Etat).subscribe(
      res => {
        //Rafraichir l'affichage    
        this.rafraichir();
        // console.log("La chambre est passée à HS :");
      }
    );
  }

  //Annoncer un problème dans la chambre
  MiseEnProbleme(Room_num, Etat) {
    this.planning.MiseEnProbleme(Room_num, Etat).subscribe(
      res => {
        this.rafraichir();
        console.log("La chambre a un problème.");
      }
    )
  }

  //Annoncer un problème résolu dans la chambre
  MiseEnSansProbleme(Room_num, Etat) {
    this.planning.MiseEnSansProbleme(Room_num, Etat).subscribe(
      res => {
        this.rafraichir();
        console.log("La chambre a un problème.");
      }
    )
  }

  //Annoncer une chambre prioritaire
  MiseEnPriorite(Room_num, Etat) {
    this.planning.MiseEnPriorite(Room_num, Etat).subscribe(
      res => {
        this.rafraichir();
        console.log("La chambre est prioritaire.");
      }
    )
  }

  //Annoncer une chambre prioritaire
  MiseEnSansPriorite(Room_num, Etat) {
    this.planning.MiseEnSansPriorite(Room_num, Etat).subscribe(
      res => {
        this.rafraichir();
        console.log("La chambre n'est plus prioritaire.");
      }
    )
  }

  //chambre vérifiée par la gouvernante : 
  MiseEnGouvernanteChecked(Room_num, Etat) {
    this.planning.MiseEnGouvernanteChecked(Room_num, Etat).subscribe(
      res => {
        this.rafraichir();
        console.log("Gouvernante a vérifié.");
      }
    )
  }

  //annuler chambre vérifiée par gouvernante
  MiseEnSansGouvernanteChecked(Room_num, Etat) {
    this.planning.MiseEnSansGouvernanteChecked(Room_num, Etat).subscribe(
      res => {
        this.rafraichir();
        console.log("Annulation chambre vérifiée par gouvernante.");
      }
    )
  }

  /*Lien vers la page concernant les options de chaque chambre*/
  loadOptionsRoomPage(){
    this.navCtrl.navigateRoot('options-room');
  }
  //////////////

  //Raffraichir 
  rafraichir() {
    this.getAllRooms();
  }

  ///////////////souad
  openCamera() {

    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.base64Image = imageData;
      this.photos.push(this.base64Image);
      this.photos.reverse();
      console.log(this.photos);
    }, (err) => {
      console.log("erreur de camera cin: ", err);
    });
    this.uploadImage(this.utilisateur.id);
  }

  uploadImage(id) {
    /*this.photos.push("V2ViZWFzeXN0ZXAgOik=");
    this.ord.push("V2ViZWFzeXN0ZXAgOik=");
    this.mutuelle.push("V2ViZWFzeXN0ZXAgOik=");*/
    //var tab = this.photos;

    //  tab = [this.photos, this.ord, this.mutuelle];

    // console.log("taille tab : " + tab.length);

    //this.planning.uploadImage(this.photos,id);
    //vider les trois tableaux après upload des photos
    this.photos = [];

  }

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
          this.graph();
          //this.repartirChSalLibParEtage();
        }
        console.log("nombre total de chambres libre et sale  :", this.NbrRoomsFreeDirty);
      }
    );
  }

  //Get all free clean rooms 
  getRoomsFreeClean() {
    this.planning.getRoomCleanFree().subscribe(
      res => {

        if (res.succes == false) {
          this.NbrRoomsFreeClean = 0;

        } else {
          this.roomsFreeClean = res;

          console.log(res);
          this.NbrRoomsFreeClean = this.roomsFreeClean.length;
          this.graph();

        }
        console.log("nombre total de chambres libre et propre :", this.NbrRoomsFreeClean);


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
          this.graph();
          //  this.repartirChSalOccParEtage();
        }
        console.log("nombre total de chambres occupées et sale :", this.NbrRoomsOccupiedDirty);
      }
    );

  }
  //Get all free dirty rooms 
  getRoomsOccupiedClean() {
    this.planning.getRoomCleanOccupied().subscribe(
      res => {
        if (res.succes == false) {
          this.NbrRoomsOccupiedClean = 0;

        } else {
          this.roomsOccupiedClean = res;
          console.log(res);
          this.NbrRoomsOccupiedClean = this.roomsOccupiedClean.length;
          this.graph();
        }
        console.log("nombre total de chambres occupées et propre :", this.NbrRoomsOccupiedClean);
      }
    );

  }
  //Get all HS rooms
  getRoomsHS() {
    this.planning.getRoomHS().subscribe(
      res => {
        if (res.succes == false) {
          this.NbrRoomsHS = 0;

        } else {
          this.roomsHS = res;
          console.log(res);
          this.NbrRoomsHS = this.roomsHS.length;
          this.graph();
        }
        console.log("nombre total de chambres HS :", this.NbrRoomsHS);
      }
    );

  }
}
