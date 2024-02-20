import { Component, OnInit } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { ToastController, ActionSheetController } from '@ionic/angular';
import { FemmeDeMenage } from 'src/models/femmeDeMenage';
import { PlanningProvider } from 'src/providers/planning';
import { HttpErrorResponse } from '@angular/common/http';
import { Room } from 'src/models/room';
import { ChambresAffectees } from 'src/models/chambresAffectees';
import { element } from '@angular/core/src/render3';
import { ActivatedRoute, Router } from '@angular/router';
import { Utilisateur } from 'src/models/utilisateurModel';
@Component({
  selector: 'app-reaffecter',
  templateUrl: './reaffecter.page.html',
  styleUrls: ['./reaffecter.page.scss'],
})
export class ReaffecterPage implements OnInit {
  public ListFM: FemmeDeMenage[] = [];
  public etage2: Room[] = [];

  public etage3: Room[] = [];

  public etage4: Room[] = [];

  public q55: ChambresAffectees[] = [];
  q1 = [
    { value: '101', color: 'primary' },
    { value: '102', color: 'tertiary' },
    { value: '103', color: 'secondary' },
    { value: '104', color: 'primary' },
    { value: '105', color: 'primary' },
    { value: '106', color: 'secondary' },
    { value: '107', color: 'primary' },
    { value: '108', color: 'secondary' },
    { value: '109', color: 'primary' },
    { value: '110', color: 'tertiary' },
    { value: '111', color: 'primary' },
    { value: '112', color: 'primary' }
  ];
  q2 = [
    { value: '121', color: 'secondary' },
    { value: '123', color: 'primary' },
    { value: '124', color: 'warning' },
    { value: '125', color: 'secondary' },
    { value: '126', color: 'secondary' },
    { value: '127', color: 'warning' },
    { value: '128', color: 'secondary' },
    { value: '129', color: 'primary' },
    { value: '120', color: 'tertiary' },
    { value: '122', color: 'secondary' }
  ];
  q3 = [
    { value: '330', color: 'tertiary' },
    { value: '331', color: 'tertiary' },
    { value: '332', color: 'secondary' },
    { value: '333', color: 'tertiary' },
    { value: '334', color: 'tertiary' },
    { value: '335', color: 'secondary' },
    { value: '336', color: 'secondary' },
    { value: '337', color: 'tertiary' },
    { value: '338', color: 'tertiary' },
    { value: '339', color: 'tertiary' },
    { value: '340', color: 'secondary' },
    { value: '341', color: 'tertiary' },
    { value: '342', color: 'secondary' },
    { value: '343', color: 'tertiary' }
  ];
  q4 = [
    { value: '350', color: 'warning' },
    { value: '351', color: 'warning' },
    { value: '352', color: 'secondary' },
    { value: '353', color: 'warning' },
    { value: '354', color: 'warning' },
    { value: '355', color: 'warning' },
    { value: '356', color: 'tertiary' },
    { value: '357', color: 'tertiary' },
    { value: '358', color: 'tertiary' },
    { value: '359', color: 'tertiary' }
  ];

  q5 = [
    { value: '220', color: 'danger' },
    { value: '221', color: 'tertiary' },
    { value: '222', color: 'danger' },
    { value: '223', color: 'warning' },
    { value: '224', color: 'danger' },
    { value: '225', color: 'secondary' },
    { value: '226', color: 'warning' },
    { value: '227', color: 'danger' },
    { value: '228', color: 'warning' },
    { value: '229', color: 'danger' }
  ];


  public roomsBySector = [];

  public roomsNotAffected = [];
  public utilisateur: Utilisateur;
  roomsBySector1 = [
    {
      femmeMenage: "Loren",
      rooms: [
        { value: '101', color: 'primary' },
        { value: '102', color: 'tertiary' },
        { value: '103', color: 'secondary' },
        { value: '104', color: 'primary' },
        { value: '105', color: 'primary' },
        { value: '106', color: 'secondary' },
        { value: '107', color: 'primary' },
        { value: '108', color: 'secondary' },
        { value: '109', color: 'primary' },
        { value: '110', color: 'tertiary' },
        { value: '111', color: 'primary' },
        { value: '112', color: 'primary' }
      ]
    },
    {
      femmeMenage: "Marina",
      rooms: [
        { value: '121', color: 'secondary' },
        { value: '123', color: 'primary' },
        { value: '124', color: 'warning' },
        { value: '125', color: 'secondary' },
        { value: '126', color: 'secondary' },
        { value: '127', color: 'warning' },
        { value: '128', color: 'secondary' },
        { value: '129', color: 'primary' },
        { value: '120', color: 'tertiary' },
        { value: '122', color: 'secondary' }
      ]
    },
    {
      femmeMenage: "Sophie",
      rooms: [
        { value: '330', color: 'tertiary' },
        { value: '331', color: 'tertiary' },
        { value: '332', color: 'secondary' },
        { value: '333', color: 'tertiary' },
        { value: '334', color: 'tertiary' },
        { value: '335', color: 'secondary' },
        { value: '336', color: 'secondary' },
        { value: '337', color: 'tertiary' },
        { value: '338', color: 'tertiary' },
        { value: '339', color: 'tertiary' },
        { value: '340', color: 'secondary' },
        { value: '341', color: 'tertiary' },
        { value: '342', color: 'secondary' },
        { value: '343', color: 'tertiary' }
      ]
    },
    {
      femmeMenage: "Marie",
      rooms: [
        { value: '350', color: 'warning' },
        { value: '351', color: 'warning' },
        { value: '352', color: 'secondary' },
        { value: '353', color: 'warning' },
        { value: '354', color: 'warning' },
        { value: '355', color: 'warning' },
        { value: '356', color: 'tertiary' },
        { value: '357', color: 'tertiary' },
        { value: '358', color: 'tertiary' },
        { value: '359', color: 'tertiary' }
      ]
    },
    {
      femmeMenage: "Aisha",
      rooms: [
        { value: '220', color: 'danger' },
        { value: '221', color: 'tertiary' },
        { value: '222', color: 'danger' },
        { value: '223', color: 'warning' },
        { value: '224', color: 'danger' },
        { value: '225', color: 'secondary' },
        { value: '226', color: 'warning' },
        { value: '227', color: 'danger' },
        { value: '228', color: 'warning' },
        { value: '229', color: 'danger' }
      ]
    }
  ];



  q6 = { room_id: '', id_FM: '' };
  //q55 =[{room_id:'', id_FM: ''}];
  todo = { value: '', color: '' };
  selectedQuadrant = 'q1';

  // public allRoomsByFM:any[] = []
  public actionSheet: ActionSheetController;
  ngOnInit() {
  }
  constructor(
    private dragulaService: DragulaService,
    private toastController: ToastController,
    private planning: PlanningProvider,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {

    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        //this.ListFM = this.router.getCurrentNavigation().extras.state.ListFM;
        // this.remplir(this.ListFM); 
        // console.log(this.ListFM);  
        this.utilisateur = this.router.getCurrentNavigation().extras.state.utilisateur;
        console.log("Utilisateur=", this.utilisateur)
      }
    });
    //this.allRooms = this.planning.getAllRoomsByFM();

    // this.getRoomsAffected(1);
    this.ExistPlanningDay();
    // this.GetRoomsNotAffected();



    // this.repartirParEtage(2);
    // this.repartirParEtage(3);
    // this.repartirParEtage(4);

    this.dragulaService.drag('bag')
      .subscribe(({ name, el, source }) => {
        // alert(" this.dragulaService.drag");
        // el.setAttribute('color', 'danger');
        console.log("drag name :", name);
        console.log("drag el :", el);
        console.log("drag source:", source);
      });

    /* this.dragulaService.drop('bag').subscribe(({ name, el, source,target,sibling }) => {
      // el.setAttribute('color', 'danger');
      alert("this.dragulaService.drop");
      console.log("drop name :" , name);
      console.log("drop el :" , el);
      console.log("drop source:" , source);
      console.log("drop sibling:" , sibling);
      console.log("drop target:" , target);
     });*/

    /*
    this.dragulaService.removeModel('bag')
    .subscribe(({ item }) => {
      this.toastController.create({
        message: 'Removed: ' + item.value,
        duration: 2000
      }).then(toast => toast.present());
    });
    */

    /*   this.dragulaService.removeModel('bag')
       .subscribe(({ source, el }) => {
       //  alert( this.dragulaService.removeModel);
         // this.dragulaService.find('bag').drake.cancel(true)
         // return false ;
         // this.dragulaService.cancel("bag");
         // sourceModel.push(item);
        // this.q5.push(el);
       });*/

    this.dragulaService.dropModel('bag')
      .subscribe(({ name, item }) => {
        console.log("dropModel name : ", name);
        console.log("dropModel item : ", item);
        console.log(this.roomsBySector);
        // this.q6.room_id=item['room_num'];
        // this.q6.id_FM =name;

        //  this.q55.push(this.q6);
        // this.q6 = { room_id: '', id_FM: '' };

        // this.q6.room_id
        // this.q6.push({item['room_num'],name});
      });


    this.dragulaService.createGroup('bag', {
      removeOnSpill: true
    });




  }
  //sauvegardre la nouvelle reafectation
  Reaffecter() {
    //Supprimer l'ancien planning
    this.planning.deleteChambresAffectees();

    //Sauvegarder le nouveau planning
    this.planning.reaffecterChambres(this.roomsBySector);
    this.rafraichir();
  }

  remplir(ListFM_affected) {
    console.log("remplir ListFM_affected :", ListFM_affected);
    ListFM_affected.forEach(element => {

      this.planning.getRoomsAffected(element.id_FM).subscribe(res => {

        if (res.succes == false) {
        } else {

          this.roomsBySector.push({ femmeMenage: element, rooms: res });
          console.log("this.roomsBySector: ", this.roomsBySector);
          //console.log("res  de getRoomsAffected: ", res); 
        }
      }
      );

    });

  }

  addTodo() {
    switch (this.selectedQuadrant) {
      case 'q1':
        this.todo.color = 'primary';
        break;
      case 'q2':
        this.todo.color = 'secondary';
        break;
      case 'q3':
        this.todo.color = 'tertiary';
        break;
      case 'q4':
        this.todo.color = 'warning';
        break;
      case 'q5':
        this.todo.color = 'danger';
        break;
    }
    this[this.selectedQuadrant].push(this.todo);
    this.todo = { value: '', color: '' };
  }


  printSelections() {

    console.log("q55: ", this.q55);
    //console.log("q1: ", this.q1);
    // console.log("q2: ", this.q2);
    //console.log("q3: ", this.q3);
    // console.log("q4: ", this.q4);
    // console.log("q5: ", this.q55);
  }
  //Essai sousou
  ExistPlanningDay() {

    //this.getListFM();

    this.planning.ExistPlanningDay().subscribe(res => {

      if (res.succes == false) {
        //console.log("Pas de planning pour aujourd'hui page reaffectation  !!"); 
      }
      else {
        //console.log("le planning existe pour aujourd'hui  page reaffectation !!");      
        //retourne la liste des FDC dans le planning d'aujourd'hui
        this.ListFM = res;
        console.log("la liste des FDC du reaffectation est : ", this.ListFM);
        this.remplir(this.ListFM);
        this.GetRoomsNotAffected();
      }
    }, (err: HttpErrorResponse) => {
      console.log(err);
    });

  }
  //retourne la liste des chambres non affectées
  GetRoomsNotAffected() {
    this.planning.getRoomsNotAffected().subscribe(res => {

      if (res.succes == false) {
        /* console.log("===============PAS ok===================");
         console.log("res  de getRoomsAffetced: ", res);      
         console.log("================ PAS ok==================");*/
      } else {
        // console.log("res  this.roomsNotAffected: ", res);     
        //this.roomsNotAffected = res;
        var room: ChambresAffectees[];
        room = res;
        this.roomsNotAffected.push({ femmeMenage: null, rooms: room });
        console.log("this.roomsNotAffected: ", this.roomsNotAffected);
        /*
         res.forEach(el=>{
           console.log("el :" ,el);
         var fm :FemmeDeMenage=null;
         var room  :ChambresAffectees[]; 
         room.push(el);
         console.log("room dans not affected: ",room); 
         this.roomsNotAffected.push({femmeMenage:null,rooms:room});
         console.log("this.roomsNotAffected: ",this.roomsNotAffected);
         });*/
      }

    }
    );
  }

  //getRoomsAffected(element.id_FM);
  getRoomsAffected_essai(id_FM) {

    this.planning.getRoomsAffected(id_FM).subscribe(res => {

      if (res.succes == false) {
        console.log("===============ok===================");
        console.log("res  de getRoomsNOTAffetced: ", res);
        console.log("================ok==================");
      } else {
        // public id_FM.value :Room[]=[];
        // val = res;
        console.log("===============ko===================");
        console.log("res  de getRoomsNotAffetced: ", res);
        console.log("================ko==================");
        // PSE TODO

      }

    }
    );

    //return this.q55;
  }

  //getRoomsAffected(element.id_FM);
  getRoomsAffected(id_FM): ChambresAffectees[] {

    var val: ChambresAffectees[];

    this.planning.getRoomsAffected(id_FM).subscribe(res => {

      if (res.succes == false) {
      } else {
        val = res;
        console.log("res  de getRoomsAffected: ", res);
      }
    }
    );
    console.log("val: ", val);
    return val;
  }
  //Repartir par etage
  repartirParEtage(floor: number) {

    this.planning.getRoomFloorId(floor).subscribe(
      res => {

        if (res.succes == false) {
          //alert("Cette étage n'existe pas !!!");

        } else {

          //  this.resultat = res;

          if (floor == 2) { this.etage2 = res; }
          if (floor == 3) { this.etage3 = res; }
          if (floor == 4) { this.etage4 = res; }

          // console.log("nombre total de chambres Etage :",floor,"est :" ,res.length );
        }

      }
    );


  }
  /*  async presentActionSheet(chambre: Room) {
      const actionSheet = await this.actionSheet.create({
        header: 'Define the room ' + chambre.room_num + ' statut : ',
        buttons: [
          {
            text: 'Propre',
            icon: 'checkmark-circle',
            handler: () => {
              //chambre.isClean = false;
              //this.chambreService.chambreList = this.chambreList.slice();
              this.MiseAPropre(chambre.id, chambre.Etat);
            }
          },
          {
            text: 'Sale',
            icon: 'close',
            handler: () => {
  
              this.MiseEnSale(chambre.id, chambre.Etat);
              //  chambre.isClean = false;
              //   this.chambreService.chambreList = this.chambreList.slice();
            }
          },
          {
            //Ce bouton il faut le désactiver pour les femmes de ménage
            text: 'Hors service',
            icon: 'add',
            handler: () => {
              this.MiseEnHS(chambre.id, chambre.Etat);
              //  chambre.isClean = false;
              //   this.chambreService.chambreList = this.chambreList.slice();
            },
          },
          {
            text: 'Recouche',
            icon: 'checkmark-circle',
            handler: () => {
              //chambre.isClean = true;
              //this.chambreService.chambreList = this.chambreList.slice();
            }
          },
          {
            text: 'Annoncer un problème',
            icon: 'construct',
            handler: () => {
              // chambre.isClean = true;
              // this.chambreService.chambreList = this.chambreList.slice();
            }
          },
          {
            text: '__________________________________________'
          }
        ]
      });
      await actionSheet.present();
    }*/
  //Changement Etat de chambre
  //Gorge  Etat des chambres
  async presentActionSheet(chambre: ChambresAffectees) {
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
            this.MiseAPropre(chambre.room_num, chambre.etat);
          }
        },
        {
          text: 'Sale',
          icon: 'close',
          cssClass: 'saleIcon',
          handler: () => {
            alert("Mise en Sale dune chambre .");
            this.MiseEnSale(chambre.room_num, chambre.etat);
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
            this.MiseEnHS(chambre.room_num, chambre.etat);
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
            this.MiseEnProbleme(chambre.room_num, chambre.etat);
          }
        },
        {
          text: 'Chambre prioritaire',
          icon: 'star',
          cssClass: 'prioritaireIcon',
          handler: () => {
            this.MiseEnPriorite(chambre.room_num, chambre.etat);
          }
        },
        {
          text: '__________________________________________'
        },
        {
          text: 'Problème résolu',
          icon: 'done-all',
          handler: () => {
            this.MiseEnSansProbleme(chambre.room_num, chambre.etat);
          }
        },
        {
          text: 'Non prioritaire',
          icon: 'remove-circle',
          handler: () => {
            this.MiseEnSansPriorite(chambre.room_num, chambre.etat);
          }
        },
        {
          text: '__________________________________________'
        },
        {
          text: 'Vérification gouvernante',
          icon: 'done-all',
          handler: () => {
            this.MiseEnGouvernanteChecked(chambre.room_num, chambre.etat);
          }
        },
        {
          text: 'Annuler vérification gouvernante',
          icon: 'remove-circle',
          handler: () => {
            this.MiseEnSansGouvernanteChecked(chambre.room_num, chambre.etat);
          }
        }
      ]
    });
    await actionSheet.present();
  }
  //Passer la chambre à propre dans la table csv et la table chambresAffecttees
  MiseAPropre(RoomId, Etat) {
    this.planning.MiseAPropreRoom(RoomId, Etat).subscribe(
      res => {
        //Rafraichir l'affichage    
        this.rafraichir();
        //console.log("La chambre est passée à propre :");
      }
    );
  }
  //Passer la chambre à sale dans la table csv et la table chambresAffecttees
  MiseEnSale(RoomId, Etat) {
    this.planning.MiseASaleRoom(RoomId, Etat).subscribe(
      res => {
        //Rafraichir l'affichage         
        this.rafraichir();
        // console.log("La chambre est passée à propre :");
      }
    );
  }

  //Passer la chambre en HS dans la table csv et la table chambresAffecttees
  MiseEnHS(RoomId, Etat) {
    this.planning.MiseHsRoom(RoomId, Etat).subscribe(
      res => {
        //Rafraichir l'affichage    
        this.rafraichir();
        // console.log("La chambre est passée à HS :");
      }
    );
  }

  //Annoncer un problème dans la chambre
  MiseEnProbleme(RoomId, Etat) {
    this.planning.MiseEnProbleme(RoomId, Etat).subscribe(
      res => {
        this.rafraichir();
        alert("MiseEnProbleme res : " + res);
        console.log("La chambre a un problème.");
      }
    )
  }

  //Annoncer un problème résolu dans la chambre
  MiseEnSansProbleme(RoomId, Etat) {
    this.planning.MiseEnSansProbleme(RoomId, Etat).subscribe(
      res => {
        this.rafraichir();
        console.log("La chambre a un problème.");
      }
    )
  }

  //Annoncer une chambre prioritaire
  MiseEnPriorite(RoomId, Etat) {
    this.planning.MiseEnPriorite(RoomId, Etat).subscribe(
      res => {
        this.rafraichir();
        console.log("La chambre est prioritaire.");
      }
    )
  }

  //Annoncer une chambre prioritaire
  MiseEnSansPriorite(RoomId, Etat) {
    this.planning.MiseEnSansPriorite(RoomId, Etat).subscribe(
      res => {
        this.rafraichir();
        console.log("La chambre est prioritaire.");
      }
    )
  }
  //chambre vérifiée par la gouvernante : 
  MiseEnGouvernanteChecked(RoomId, Etat) {

    this.planning.MiseEnGouvernanteChecked(RoomId, Etat).subscribe(
      res => {
        this.rafraichir();
        console.log("Gouvernante a vérifié.");
      }
    )
  }

  //annuler chambre vérifiée par gouvernante
  MiseEnSansGouvernanteChecked(RoomId, Etat) {
    this.planning.MiseEnSansGouvernanteChecked(RoomId, Etat).subscribe(
      res => {
        this.rafraichir();
        console.log("Annulation chambre vérifiée par gouvernante.");
      }
    )
  }
  rafraichir() {

    this.roomsBySector = [];
    this.remplir(this.ListFM);
  }
  //////////////

  //////// Fin Changement Eat de chambre////////////////

}