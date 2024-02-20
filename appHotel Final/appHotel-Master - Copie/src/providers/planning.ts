import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {
  LIEN_ADD_ROOMS,
  LIEN_GET_FLOOR_ROOMS,
  LIEN_UPDATE_ROOM_HS,
  LIEN_GET_ALL_ROOMS,
  LIEN_GET_FREE_DIRTY_ROOMS,
  LIEN_GET_FREE_CLEAN_ROOMS,
  LIEN_GET_OCCUPIED_DIRTY_ROOMS,
  LIEN_GET_OCCUPIED_CLEAN_ROOMS,
  LIEN_UPDATE_ROOM_CLEAN,
  LIEN_UPDATE_ROOM_DIRTY,
  LIEN_GET_HS_ROOMS,
  LIEN_GET_ALL_FM,
  LIEN_GET_FM_CODE,
  LIEN_GET_PLANNING_EXISTE,
  LIEN_DELETE_ROOMS_FM,
  LIEN_DELETE_FM,
  LIEN_UPDATE_FM,
  LIEN_ADD_FM,
  LIEN_GET_ALL_FM_OFF,
  LIEN_EXIST_FILE,
  LIEN_GET_ROOMS_AFFECTED_DFC,
  LIEN_GET_ROOMS_AFFECTED_SECTEUR_ID,
  LIEN_ACTIVER_FM,
  LIEN_GET_ROOMS_NOT_AFFECTED_DFC,
  LIEN_ADD_ROOMS_REAFFECTED,
  LIEN_UPDATE_ROOM_ISSUE,
  LIEN_UPDATE_ROOM_NONE_ISSUE,
  LIEN_UPDATE_ROOM_NONE_PRIORITY,
  LIEN_UPDATE_ROOM_PRIORITY,
  LIEN_UPDATE_ROOM_GOUVERNANTE_CHECKED,
  LIEN_UPDATE_ROOM_NONE_GOUVERNANTE_CHECKED,

  
  LIEN_UPDATE_ROOM_LITBEBE,
  LIEN_UPDATE_ROOM_PORTEOUVERTE,
  LIEN_UPDATE_ROOM_PORTEFERMEE,
  LIEN_UPDATE_ROOM_CANAPEOUVERT,
  LIEN_UPDATE_ROOM_CANAPEFERME,
  LIEN_UPDATE_ROOM_LITITALIENNE,
  LIEN_UPDATE_ROOM_CADEAUCHOCOLAT,
  LIEN_UPDATE_ROOM_CADEAUCHAMPAGNE,
  LIEN_UPDATE_ROOM_CADEAUFLEUR,

  LIEN_UPDATE_ROOM_DETAILSROOM
  //LIEN_UPLOAD_FILES,
  // LIEN_DOWNLOAD_FILES 
} from '../providers/config_bdd';
import { LIEN_ADD_ROOMS_FM } from '../providers/config_bdd';
import { FemmeDeMenage } from 'src/models/femmeDeMenage';
import { Observable } from 'rxjs';

/*
  Generated class for the PlanningProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PlanningProvider {

  constructor(public http: HttpClient) {
    console.log('Hello PlanningProvider Provider');
  }

  //----------  CRUD ROOM  ----------------
  createRooms(rooms): any {
    return this.http.post(LIEN_ADD_ROOMS, rooms
      , {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .set('Access-Control-Allow-Origin', '*')
      }
    );
  }
  //Return all rooms from BD
  getAllRooms(): any {
    return this.http.post(LIEN_GET_ALL_ROOMS
      , {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .set('Access-Control-Allow-Origin', '*')
      }
    );
  }
  //Return Rooms Floor Id
  getRoomFloorId(floor): any {
    var myData = JSON.stringify({ floor: floor });


    return this.http.post(LIEN_GET_FLOOR_ROOMS, myData, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Access-Control-Allow-Origin', '*')
    });
  }
  //Retun free dirty rooms 
  getRoomDityFree(): any {
    return this.http.post(LIEN_GET_FREE_DIRTY_ROOMS
      , {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .set('Access-Control-Allow-Origin', '*')
      }
    );
  }
  //return free clean rooms
  getRoomCleanFree(): any {
    return this.http.post(LIEN_GET_FREE_CLEAN_ROOMS
      , {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .set('Access-Control-Allow-Origin', '*')
      }
    );
  }
  //Return Occupied rooms DIRTY
  getRoomDirtyOccupied(): any {
    return this.http.post(LIEN_GET_OCCUPIED_DIRTY_ROOMS
      , {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .set('Access-Control-Allow-Origin', '*')
      }
    );
  }
  //Return Occupied rooms
  getRoomCleanOccupied(): any {
    return this.http.post(LIEN_GET_OCCUPIED_CLEAN_ROOMS
      , {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .set('Access-Control-Allow-Origin', '*')
      }
    );
  }
  //Return HS rooms
  getRoomHS(): any {
    return this.http.post(LIEN_GET_HS_ROOMS
      , {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .set('Access-Control-Allow-Origin', '*')
      }
    );
  }

  //Mise à propre d'une chambre
  MiseAPropreRoom(Room_num, Etat): any {
    var myData = JSON.stringify({ Room_num: Room_num, Etat: Etat });

    return this.http.post(LIEN_UPDATE_ROOM_CLEAN, myData, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Access-Control-Allow-Origin', '*')
    });
  }
  //Mise en sale d'une chambre dans la table csv
  MiseASaleRoom(Room_num, Etat): any {
    var myData = JSON.stringify({ Room_num: Room_num, Etat: Etat });

    return this.http.post(LIEN_UPDATE_ROOM_DIRTY, myData, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Access-Control-Allow-Origin', '*')
    });
  }

  //Mise il ya un problème
  MiseEnProbleme(Room_num, Etat): any {
    var myData = JSON.stringify({ Room_num: Room_num, Etat: Etat });

    return this.http.post(LIEN_UPDATE_ROOM_ISSUE, myData, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Access-Control-Allow-Origin', '*')
    });
  }

  //Mise il ya aucun pb
  MiseEnSansProbleme(Room_num, Etat): any {
    var myData = JSON.stringify({ Room_num: Room_num, Etat: Etat });

    return this.http.post(LIEN_UPDATE_ROOM_NONE_ISSUE, myData, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Access-Control-Allow-Origin', '*')
    });
  }

  //Mise en priority
  MiseEnPriorite(Room_num, Etat): any {
    var myData = JSON.stringify({ Room_num: Room_num, Etat: Etat });

    return this.http.post(LIEN_UPDATE_ROOM_PRIORITY, myData, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Access-Control-Allow-Origin', '*')
    });
  }
  //Mise Pas priority
  MiseEnSansPriorite(Room_num, Etat): any {
    var myData = JSON.stringify({ Room_num: Room_num, Etat: Etat });

    return this.http.post(LIEN_UPDATE_ROOM_NONE_PRIORITY, myData, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Access-Control-Allow-Origin', '*')
    });
  }
  //Mise MiseEnSansGouvernanteChecked(RoomId, Etat)
  MiseEnGouvernanteChecked(Room_num, Etat): any {
    var myData = JSON.stringify({ Room_num: Room_num, Etat: Etat });

    return this.http.post(LIEN_UPDATE_ROOM_GOUVERNANTE_CHECKED, myData, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Access-Control-Allow-Origin', '*')
    });
  }
  //Mise MiseEnSansGouvernanteChecked(RoomId, Etat)
  MiseEnSansGouvernanteChecked(Room_num, Etat): any {
    var myData = JSON.stringify({ Room_num: Room_num, Etat: Etat });

    return this.http.post(LIEN_UPDATE_ROOM_NONE_GOUVERNANTE_CHECKED, myData, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Access-Control-Allow-Origin', '*')
    });
  }
  //Mise en sale d'une chambre dans la table chambresAffectees
  /*MiseASaleRoom_Planning(RoomId,Etat): any{
    var myData = JSON.stringify({ RoomId: RoomId, Etat:Etat});
    
    // alert(myData);
    return this.http.post( LIEN_UPDATE_ROOM_AFFECTED_DIRTY, myData, { 
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Access-Control-Allow-Origin', '*')
    });
  }*/

  //Mise HS d'une chambre
  MiseHsRoom(Room_num, Etat): any {
    var myData = JSON.stringify({ Room_num: Room_num, Etat: Etat });

    // alert(myData);
    return this.http.post(LIEN_UPDATE_ROOM_HS, myData, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Access-Control-Allow-Origin', '*')
    });
  }



  /******** Options des chambres *******
  *************************************/
  detailsRoom(Room_num): any {
    var myData = JSON.stringify({ Room_num: Room_num });

    alert(myData);
    return this.http.post(LIEN_UPDATE_ROOM_DETAILSROOM, myData, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Access-Control-Allow-Origin', '*')
    });

  }

  MiseALitBebe(Room_num, is_litBebe): any {
    var myData = JSON.stringify({ Room_num: Room_num, is_litBebe: is_litBebe });

    alert(myData);
    return this.http.post(LIEN_UPDATE_ROOM_LITBEBE, myData, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Access-Control-Allow-Origin', '*')
    });
  }

  MiseAPorteOuverte(Room_num, is_porteOuverte): any {
    var myData = JSON.stringify({ Room_num: Room_num, is_porteOuverte: is_porteOuverte });

    alert(myData);
    return this.http.post(LIEN_UPDATE_ROOM_PORTEOUVERTE, myData, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Access-Control-Allow-Origin', '*')
    });
  }

  MiseAPorteFermee(Room_num, is_porteFermee): any {
    var myData = JSON.stringify({ Room_num: Room_num, is_porteFermee: is_porteFermee });

    alert(myData);
    return this.http.post(LIEN_UPDATE_ROOM_PORTEFERMEE, myData, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Access-Control-Allow-Origin', '*')
    });
  }

  MiseACanapeOuvert(Room_num, is_canapeOuvert): any {
    var myData = JSON.stringify({ Room_num: Room_num, is_canapeOuvert: is_canapeOuvert });

    alert(myData);
    return this.http.post(LIEN_UPDATE_ROOM_CANAPEOUVERT, myData, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Access-Control-Allow-Origin', '*')
    });
  }

  MiseACanapeFerme(Room_num, is_canapeFerme): any {
    var myData = JSON.stringify({ Room_num: Room_num, is_canapeFerme: is_canapeFerme });

    alert(myData);
    return this.http.post(LIEN_UPDATE_ROOM_CANAPEFERME, myData, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Access-Control-Allow-Origin', '*')
    });
  }

  MiseALitItalienne(Room_num, is_litItalienne): any {
    var myData = JSON.stringify({ Room_num: Room_num, is_litItalienne: is_litItalienne });

    alert(myData);
    return this.http.post(LIEN_UPDATE_ROOM_LITITALIENNE, myData, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Access-Control-Allow-Origin', '*')
    });
  }

  MiseACadeauChocolat(Room_num, is_cadeauChocolat): any {
    var myData = JSON.stringify({ Room_num: Room_num, is_cadeauChocolat: is_cadeauChocolat });

    alert(myData);
    return this.http.post(LIEN_UPDATE_ROOM_CADEAUCHOCOLAT, myData, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Access-Control-Allow-Origin', '*')
    });
  }

  MiseACadeauChampagne(Room_num, is_cadeauChampagne): any {
    var myData = JSON.stringify({ Room_num: Room_num, is_cadeauChampagne: is_cadeauChampagne });

    alert(myData);
    return this.http.post(LIEN_UPDATE_ROOM_CADEAUCHAMPAGNE, myData, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Access-Control-Allow-Origin', '*')
    });
  }

  MiseACadeauFleur(Room_num, is_cadeauFleur): any {
    var myData = JSON.stringify({ Room_num: Room_num, is_cadeauFleur: is_cadeauFleur });

    alert(myData);
    return this.http.post(LIEN_UPDATE_ROOM_CADEAUFLEUR, myData, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Access-Control-Allow-Origin', '*')
    });
  }


  ///////////////////////Femme de Ménage
  getAllFM(): any {
    return this.http.post(LIEN_GET_ALL_FM, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Access-Control-Allow-Origin', '*')
    }
    );
  }
  getAllFM_desactiver(): any {
    return this.http.post(LIEN_GET_ALL_FM_OFF, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Access-Control-Allow-Origin', '*')
    }
    );
  }
  addChambresAffectees(listfm): any {
    // let myData = JSON.stringify(listFM);
    //let tab = [];
    // tab =listFM;
    let myData = JSON.stringify(listfm);
     alert(myData);
    // console.log("femmes: ",listfm);
    // return this.http.post(LIEN_ADD_ROOMS_FM,myData);
    return this.http.post(LIEN_ADD_ROOMS_FM, myData);
  }
  //getRoomsAffected selon id de FDC
  getRoomsAffected(id_FM): any {
    var myData = JSON.stringify({ id_FM: id_FM });
    return this.http.post(LIEN_GET_ROOMS_AFFECTED_DFC, myData
      , {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .set('Access-Control-Allow-Origin', '*')
      }
    );
  }
  //getRoomsAffected selon id de FDC
  getRoomsNotAffected(): any {

    return this.http.post(LIEN_GET_ROOMS_NOT_AFFECTED_DFC,
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .set('Access-Control-Allow-Origin', '*')
      }
    );
  }
  //Return Rooms Floor Id
  getRoomSecteurId_Planning(secteur): any {
    var myData = JSON.stringify({ secteur: secteur });

    return this.http.post(LIEN_GET_ROOMS_AFFECTED_SECTEUR_ID, myData, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Access-Control-Allow-Origin', '*')
    });
  }
  getFDC(code): any {
    //var myData = JSON.stringify({code : code});
    return this.http.get(LIEN_GET_FM_CODE + "?code=" + code)
  }

  /*
  getFDC (code): any {
    var myData = JSON.stringify({code : code});
   
    return this.http.post(LIEN_GET_FM_CODE, myData, {
      headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Access-Control-Allow-Origin', '*')
          }
       );
    }
    */
  //Verifier si planning du jour existe
  ExistPlanningDay(): any {
    return this.http.post(LIEN_GET_PLANNING_EXISTE, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Access-Control-Allow-Origin', '*')
    });
  }
  //Delete planning 
  deleteChambresAffectees() {
    // alert("delete planning");
    let dt: Observable<any> = this.http.post(LIEN_DELETE_ROOMS_FM, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Access-Control-Allow-Origin', '*')
    });
    dt.subscribe((result) => {
      console.log("result de delete: ", result);
    }, err => {
      console.log("erreur resultat de delete " + err);
    });

    
    /*return this.http.post(LIEN_DELETE_ROOMS_FM,{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Access-Control-Allow-Origin', '*')
      }
    );*/
  }

  //reaffecter des chambres
  reaffecterChambres(roomsReaffected): any {
    let myData = JSON.stringify(roomsReaffected);
    console.log(myData);
    // console.log("femmes: ",listfm);
    // return this.http.post(LIEN_ADD_ROOMS_FM,myData);
    let dt: Observable<any> = this.http.post(LIEN_ADD_ROOMS_REAFFECTED, myData, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Access-Control-Allow-Origin', '*')
    });
    dt.subscribe((result) => {
      console.log("result de reaffectation: ", result);
    }, err => {
      console.log("erreur resultat de reaffectation " + err);
    });
  }

  desactiverFDC(id) {
    let myData = JSON.stringify({ id: id });
    //alert(myData);
    return this.http.post(LIEN_DELETE_FM, myData, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Access-Control-Allow-Origin', '*')
    });
  }
  activerFDC(id) {
    let myData = JSON.stringify({ id: id });
    //alert(myData);
    return this.http.post(LIEN_ACTIVER_FM, myData, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Access-Control-Allow-Origin', '*')
    });
  }
  updateFDC(femme): any {
    let myData = JSON.stringify(femme);
    console.log("nouvelle FDC : " + myData);
    return this.http.post(LIEN_UPDATE_FM, myData, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Access-Control-Allow-Origin', '*')
    });
  }

  addFDC(nom, prenom, etage, secteur, code, is_active, presence): any {
    let myData = JSON.stringify({ nom, prenom, etage, code, secteur, is_active, presence });
    console.log("ADD FDC : " + myData);
    return this.http.post(LIEN_ADD_FM, myData, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Access-Control-Allow-Origin', '*')
    });
  }
  //upload photo of FDC
  /* uploadImage(image, id) {
    
     alert ("id user  upload :"+id);
     //let url = this.apiUrl + '/upload/uploader.php';
     alert(" image à uploader: "+image);
     //alert("rest upload id demande: "+id);
     var myData = JSON.stringify(id);
     alert("myData c id de FDC"+myData );
   //  image.forEach(element => {
       let postData = new FormData();
 
       postData.append('base64_file', image);
       postData.append('base64_demande', myData);
 
       //let dt: Observable<any> = this.http.post(url, postData);
       let dt: Observable<any> = this.http.post(LIEN_UPLOAD_FILES, postData);
       dt.subscribe((result) => {
         console.log("result de l'upload: ", result);
       },err =>{
         console.log("erreur resultat de upload "+err);
       });
     //});
 
   }
   DownloadFiles(id) : any {
        
     var myData = JSON.stringify({ id: id });
     return this.http.post(LIEN_DOWNLOAD_FILES, myData, {
       headers: new HttpHeaders()
         .set('Content-Type', 'application/x-www-form-urlencoded')
         .set('Access-Control-Allow-Origin', '*')
     });
 
   }*/
  exist_image(imageName): any {
    var myData = JSON.stringify({ imageName: imageName });
    //alert("imageName : "+myData);
    return this.http.post(LIEN_EXIST_FILE, myData, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Access-Control-Allow-Origin', '*')
    });
  }
}
