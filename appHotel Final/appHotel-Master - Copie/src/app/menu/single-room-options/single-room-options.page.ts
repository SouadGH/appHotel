import { Component, OnInit, NgModule } from '@angular/core';
import { Room } from 'src/models/room';
import { NavComponent } from '@ionic/core';
import { NavParams, ModalController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { PlanningProvider } from 'src/providers/planning';

@Component({
  selector: 'app-single-room-options',
  templateUrl: './single-room-options.page.html',
  styleUrls: ['./single-room-options.page.scss'],
})

export class SingleRoomOptionsPage implements OnInit {
  chambre: Room;
  data: any;

  constructor(
    public navParams: NavParams,
    private planning: PlanningProvider,
    private modalCtrl: ModalController) {
  }

  ngOnInit() {
  }

  /*********************************
  ********* Remove options *********
  **********************************/

  MiseALitBebe(Room_num, is_litBebe) {
    this.planning.MiseALitBebe(Room_num, is_litBebe)
      .subscribe(
        res => { }
      );
    this.modalCtrl.dismiss();
  }

  MiseAPorteOuverte(Room_num, is_porteOuverte) {
    this.planning.MiseAPorteOuverte(Room_num, is_porteOuverte)
      .subscribe(
        res => { }
      );
    this.modalCtrl.dismiss();
  }

  MiseAPorteFermee(Room_num, is_porteFermee) {
    this.planning.MiseAPorteFermee(Room_num, is_porteFermee)
      .subscribe(
        res => { }
      );
    this.modalCtrl.dismiss();
  }

  MiseACanapeOuvert(Room_num, is_canapeOuvert) {
    this.planning.MiseACanapeOuvert(Room_num, is_canapeOuvert)
      .subscribe(
        res => { }
      );
    this.modalCtrl.dismiss();
  }

  MiseACanapeFerme(Room_num, is_canapeFerme) {
    this.planning.MiseACanapeFerme(Room_num, is_canapeFerme)
      .subscribe(
        res => { }
      );
    this.modalCtrl.dismiss();
  }

  MiseALitItalienne(Room_num, is_litItalienne) {
    this.planning.MiseALitItalienne(Room_num, is_litItalienne)
      .subscribe(
        res => { }
      );
    this.modalCtrl.dismiss();
  }

  MiseACadeauChocolat(Room_num, is_cadeauChocolat) {
    this.planning.MiseACadeauChocolat(Room_num, is_cadeauChocolat)
      .subscribe(
        res => { }
      );
    this.modalCtrl.dismiss();
  }

  MiseACadeauChampagne(Room_num, is_cadeauChampagne) {
    this.planning.MiseACadeauChampagne(Room_num, is_cadeauChampagne)
      .subscribe(
        res => { }
      );
    this.modalCtrl.dismiss();
  }

  MiseACadeauFleur(Room_num, is_cadeauFleur) {
    this.planning.MiseACadeauFleur(Room_num, is_cadeauFleur)
      .subscribe(
        res => { }
      );
    this.modalCtrl.dismiss();
  }

}
