import { Component, OnInit, NgModule } from '@angular/core';
import { FemmeDeMenage } from 'src/models/femmeDeMenage';
import { Room } from 'src/models/room';
import { Subscription, interval } from 'rxjs';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { PlanningProvider } from 'src/providers/planning';
import { ActionSheetController, NavController, ModalController } from '@ionic/angular';
import { Utilisateur } from 'src/models/utilisateurModel';
import { SingleRoomOptionsPage } from '../single-room-options/single-room-options.page';
import { ngModuleJitUrl } from '@angular/compiler';

@Component({
  selector: 'app-options-room',
  templateUrl: './options-room.page.html',
  styleUrls: ['./options-room.page.scss'],
})
//@NgModule()
export class OptionsRoomPage implements OnInit {

  public listFM: FemmeDeMenage[] = [];
  private nbrAllFM: number;
  private utilisateur: Utilisateur;

  private nbrAllRooms: number;
  allRooms: Room[];
  Etage2: Room[];
  public Etage3: Room[];
  public Etage4: Room[];

  private interval: any;
  private observableVar: Subscription;


  chambre: Room;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private planning: PlanningProvider,
    public actionSheet: ActionSheetController,
    private navCtrl: NavController,
    private modalCtrl: ModalController) {

    this.getListFM();

    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.utilisateur = this.router.getCurrentNavigation().extras.state.utilisateur;
        // console.log(this.utilisateur);
      }
    });

    this.rafraichir();
  }


  ngOnInit() {
    //this.observableVar = interval(10000).subscribe(() => {
      // console.log("Refreshing DATA now");
      this.refreshData();
   // });
  }

  ionViewDidLeave() {
    this.observableVar.unsubscribe();
  }

  ionViewWillEnter() {
    this.refreshData();
    // console.log("Refreshing DATA now");
   // this.interval = setInterval(() => {
      this.refreshData();
      // console.log("Refreshing DATA 2 now");
  //  }, 10000);
  }
  
  ionViewDidEnter(){
    this.refreshData();
  }

  refreshData() {
    this.refreshPageComtent()
  }

  refreshPageComtent() {
    this.rafraichir()
  }

  getListFM() {
    this.planning.getAllFM().subscribe(
      res => {
        if (res.succes == false) {
          this.nbrAllFM = 0;
        } else {
          this.listFM = res;
          console.log(res);
          this.nbrAllFM = this.listFM.length;
          console.log("nombre total de chambres  :", this.listFM.length);
        }
      }
    );
  }

  //Get all rooms
  getAllRooms() {
    this.planning.getAllRooms().subscribe(
      res => {

        if (res.succes == false) {
          this.nbrAllRooms = 0;

        } else {
          this.allRooms = res;
          console.log(res);
          this.nbrAllRooms = this.allRooms.length;
          //this.graph();       

          // console.log("nombre total de chambres  :", this.allRooms.length);
          this.repartirParEatge(2);
          this.repartirParEatge(3);
          this.repartirParEatge(4);
        }
      }
    );
  }

  //Repartir par etage
  repartirParEatge(floor: number) {
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

  //Raffraichir 
  rafraichir() {
    this.getAllRooms();
  }

  async presentActionSheet(chambre: Room) {
    const actionSheet = await this.actionSheet.create({
      header: 'Options de la chambre ' + chambre.room_num + ' :',
      cssClass: 'myActionSheetOptionsRoom',
      buttons: [
        {
          text: 'détails des options',
          handler: () => {
            this.onLoadChambre(chambre);
          }
        },
        {
          text:'__________________________________'
        },
        {
          text: 'Lit bébé',
          handler: () => {
            this.MiseALitBebe(chambre.room_num, chambre.is_litBebe);
          }
        },
        {
          text: 'Ouvrir la porte',
          handler: () => {
            this.MiseAPorteOuverte(chambre.room_num, chambre.is_porteOuverte);
          }
        },
        {
          text: 'Fermer la porte',
          handler: () => {
            this.MiseAPorteFermee(chambre.room_num, chambre.is_porteFermee);
          }
        },
        {
          text: 'Ouvrir le canapé',
          handler: () => {
            this.MiseACanapeOuvert(chambre.room_num, chambre.is_canapeOuvert);
          }
        },
        {
          text: 'Fermer le canapé',
          handler: () => {
            this.MiseACanapeFerme(chambre.room_num, chambre.is_canapeFerme);
          }
        },
        {
          text: 'Lit à l\'italienne',
          handler: () => {
            this.MiseALitItalienne(chambre.room_num, chambre.is_litItalienne);
          }
        },
        {
          text: 'Cadeau : Chocolat',
          handler: () => {
            this.MiseACadeauChocolat(chambre.room_num, chambre.is_cadeauChocolat);
          }
        },
        {
          text: 'Cadeau : Champagne',
          handler: () => {
            this.MiseACadeauChampagne(chambre.room_num, chambre.is_cadeauChampagne);
          }
        },
        {
          text: 'Cadeau : Fleurs',
          handler: () => {
            this.MiseACadeauFleur(chambre.room_num, chambre.is_cadeauFleur);
          }
        }
      ]
    });
    await actionSheet.present();
  }


  async onLoadChambre(chambre: Room) {
    const modal = await this.modalCtrl.create({
      component: SingleRoomOptionsPage,
      componentProps: { chambre: chambre }
    });
    return await modal.present();
  }


  MiseALitBebe(Room_num, is_litBebe) {
    this.planning.MiseALitBebe(Room_num, is_litBebe).subscribe(
      res => {
        //Rafraichir l'affichage    
        this.rafraichir();
        // console.log("La chambre est passée à propre :");
      }
    );
  }

  MiseAPorteOuverte(Room_num, is_porteOuverte) {
    this.planning.MiseAPorteOuverte(Room_num, is_porteOuverte).subscribe(
      res => {
        //Rafraichir l'affichage    
        this.rafraichir();
      }
    );
  }

  MiseAPorteFermee(Room_num, is_porteFermee) {
    this.planning.MiseAPorteFermee(Room_num, is_porteFermee).subscribe(
      res => {
        //Rafraichir l'affichage    
        this.rafraichir();
      }
    );
  }

  MiseACanapeOuvert(Room_num, is_canapeOuvert) {
    this.planning.MiseACanapeOuvert(Room_num, is_canapeOuvert).subscribe(
      res => {
        //Rafraichir l'affichage    
        this.rafraichir();
      }
    );
  }

  MiseACanapeFerme(Room_num, is_canapeFerme) {
    this.planning.MiseACanapeFerme(Room_num, is_canapeFerme).subscribe(
      res => {
        //Rafraichir l'affichage    
        this.rafraichir();
      }
    );
  }

  MiseALitItalienne(Room_num, is_litItalienne) {
    this.planning.MiseALitItalienne(Room_num, is_litItalienne).subscribe(
      res => {
        //Rafraichir l'affichage    
        this.rafraichir();
      }
    );
  }

  MiseACadeauChocolat(Room_num, is_cadeauChocolat) {
    this.planning.MiseACadeauChocolat(Room_num, is_cadeauChocolat).subscribe(
      res => {
        //Rafraichir l'affichage    
        this.rafraichir();
      }
    );
  }

  MiseACadeauChampagne(Room_num, is_cadeauChampagne) {
    this.planning.MiseACadeauChampagne(Room_num, is_cadeauChampagne).subscribe(
      res => {
        //Rafraichir l'affichage    
        this.rafraichir();
      }
    );
  }

  MiseACadeauFleur(Room_num, is_cadeauFleur) {
    this.planning.MiseACadeauFleur(Room_num, is_cadeauFleur).subscribe(
      res => {
        //Rafraichir l'affichage    
        this.rafraichir();
      }
    );
  }

}
