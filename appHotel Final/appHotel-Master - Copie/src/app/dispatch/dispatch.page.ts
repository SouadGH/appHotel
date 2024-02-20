import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { NavController, Platform, ActionSheetController, ToastController, LoadingController, ModalController } from '@ionic/angular';
import { UtilisateurProvider } from 'src/providers/utilisateurProvider';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { FemmeDeMenage } from 'src/models/femmeDeMenage';

import { PlanningProvider } from 'src/providers/planning';
import { Room } from 'src/models/room';

import { Observable } from 'rxjs';
import { Subscription, interval } from "rxjs";
import { Utilisateur } from 'src/models/utilisateurModel';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/Camera/ngx';
import { LIEN_PATH_FILES, LIEN_FICHIER_UPLOAD } from 'src/providers/config_bdd';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { HttpClient } from '@angular/common/http';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { finalize } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { ChambresAffectees } from 'src/models/chambresAffectees';
import { Chart } from 'chart.js';
import { SingleRoomOptionsPage } from '../menu/single-room-options/single-room-options.page';
import { ChambresAffecteesOptionsPage } from './chambresaffecteesoptions.page';

const STORAGE_KEY = 'my_images';
@Component({
  selector: 'app-dispatch',
  templateUrl: './dispatch.page.html',
  styleUrls: ['./dispatch.page.scss'],
})
export class DispatchPage implements OnInit {
  @ViewChild('barCanvas') barCanvas;
  @ViewChild('barCanvas1') barCanvas1;

  barChart: any;
  barChart1: any;
  ListFM: FemmeDeMenage[] = [];
  path = LIEN_FICHIER_UPLOAD;
  public etage2: Room[];

  public etage3: Room[];

  public etage4: Room[];
  public etage1: Room[];

  public etage5: Room[];
  public secteur1: ChambresAffectees[] = [];
  public secteur2: ChambresAffectees[] = [];
  public secteur3: ChambresAffectees[] = [];
  public secteur4: ChambresAffectees[] = [];
  public secteur5: ChambresAffectees[] = [];


  public resultat: Room[];
  public base64Image: string;
  public photos: string[];
  photos_downloaded: any;
  private interval: any;
  private observableVar: Subscription;

  public utilisateur: Utilisateur;
  public roomsBySector = [];
  path_base = LIEN_FICHIER_UPLOAD + "/";
  images = [];
  public exist_image_path: boolean = false;

  constructor(
    private navCtrl: NavController,
    private utilisateurProvider: UtilisateurProvider,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private platform: Platform,
    private planning: PlanningProvider,
    private camera: Camera,
    public actionSheetCtrl: ActionSheetController,
    public actionSheet: ActionSheetController,

    //variable pour photo
    private file: File,
    private http: HttpClient,
    private webview: WebView,
    private actionSheetController: ActionSheetController,
    private toastController: ToastController,
    private storage: Storage,
    private plt: Platform,
    private loadingController: LoadingController,
    private ref: ChangeDetectorRef,
    private filePath: FilePath,

    private modalCtrl: ModalController
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.ListFM = this.router.getCurrentNavigation().extras.state.ListFM;
        this.remplir(this.ListFM);
        // console.log(this.ListFM);  
        this.utilisateur = this.router.getCurrentNavigation().extras.state.utilisateur;
        console.log("this utilisateur EST : " + this.utilisateur.nom_utilisateur);
        //test if image exist
        //this.exist_image(this.utilisateur.mot_de_passe.toString() + ".jpg");
        //this.path = this.path + "/" + this.utilisateur.mot_de_passe.toString() + ".jpg";
        // console.log("=======gggggg=========="); 
        // console.log (this.utilisateur) ;
        // console.log("========gggggg========="); 
      } else {
        this.utilisateur = JSON.parse(localStorage.getItem('utilisateur'));
        this.ListFM = JSON.parse(localStorage.getItem('listFM'));
        this.remplir(this.ListFM);
      }
    });
    //repartir par etage
    // this.repartirParEtage(2);
    // this.repartirParEtage(3);
    //this.repartirParEtage(4);

    //repartir par secteur
    /*this.repartirParSecteur_Planning(1);
     this.repartirParSecteur_Planning(2);
     this.repartirParSecteur_Planning(3);
     this.repartirParSecteur_Planning(4);
     this.repartirParSecteur_Planning(5);*/


    //this.download_image();

    // this.ngOnInit();
    // alert(this.utilisateur);

    /*  this.path.concat("/");
      this.path.concat(this.utilisateur.mot_de_passe.toString());
      this.path.concat(".jpg");
      console.log("path is :", this.path);*/
    // this.path.concat(this.utilisateur.mot_de_passe).concat("jpg");
    this.plt.ready().then(() => {
      this.loadStoredImages();
    });

  }

  exist_image(imageName): any {
    var im: any;
    this.planning.exist_image(imageName).subscribe(
      res => {
        if (res == true) {
          im = this.path_base + imageName.toString() + ".jpg";
          this.exist_image_path = true;
        }
        else {
          im = "../../assets/images/none.jpg";
          this.exist_image_path = false;
        }
      }
    );
    return im;
  }

  ngOnInit() {
    //this.observableVar = interval(10000).subscribe(() => {
    // console.log("Refreshing DATA now");
    this.rafraichir();

    // });
    // this.plt.ready().then(() => {
    this.loadStoredImages();
    // });
  }

  exist_image1(codeFDC): boolean {

    this.path = "";
    this.path = this.path_base + codeFDC.toString() + ".jpg";
    let valeur: boolean = false;
    valeur = this.planning.exist_image(codeFDC.toString() + ".jpg");

    return valeur;
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

  ionViewDidLeave() {
    this.observableVar.unsubscribe();
  }

  ionViewWillEnter() {
    this.rafraichir();
    // console.log("Refreshing DATA now");
    // this.interval = setInterval(() => {
    //  this.rafraichir();
    // console.log("Refreshing DATA 2 now");
    // }, 10000);
  }

  rafraichir() {
    this.refreshPageComtent();
  }

  graph_essai(id_secteur) {

    //retourne la liste des chambres du secteur voulu
    let secteur: ChambresAffectees[] = this.quel_secteur(id_secteur);
    var nbr_Recouche: number = this.total_Recouche_Secteur(secteur);
    var nbr_Depart: number = this.total_Depart_Secteur(secteur);

    console.log("nbr_Recouche :", nbr_Recouche);
    this.barChart = new Chart(this.barCanvas.nativeElement, {

      type: 'bar',
      data: {
        labels: ["Recouche", "Départ"],
        datasets: [{
          label: '',
          data: [nbr_Recouche, nbr_Depart],
          backgroundColor: [
            'rgba(255, 255, 128,0.2)',
            'rgba(255, 99, 132, 0.2)'
          ],
          borderColor: [
            'rgba(255, 255, 128, 1)',
            'rgba(255,99,132,1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }

    });

  }
  quel_secteur(id_secteur): ChambresAffectees[] {
    var secteur: ChambresAffectees[] = [];
    switch (id_secteur) {

      case 1:
        secteur = this.secteur1;
        break;

      case 2:
        secteur = this.secteur2;
        break;

      case 3:
        secteur = this.secteur3;
        break;

      case 4:
        secteur = this.secteur4;
        break;

      case 5:
        secteur = this.secteur5;
        break;

    }
    return secteur;
  }
  //retourne le nombre total des recouches
  total_Recouche_Secteur(secteur): number {
    let nbr_recouche: number = 0;
    secteur.forEach(element => {
      if (element.etat == 'OCC-Sal') {
        nbr_recouche++;
      }
    });
    console.log("nbr_Recouche fonction :", nbr_recouche);
    return nbr_recouche;
  }

  //retourne le nombre total des départs
  total_Depart_Secteur(secteur): number {

    let nbr_Depart: number = 0;
    secteur.forEach(element => {
      if (element.etat == 'LIB-Sal') {
        nbr_Depart++;
      }
    });
    return nbr_Depart;
  }

  /*graph() {
  
    this.barChart = new Chart(this.barCanvas.nativeElement, {
  
        type: 'bar',    
        data: {
            labels: ["Recouche", "Départ"],
           
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
  
    });
  
  }*/
  refreshPageComtent() {
    this.path = LIEN_FICHIER_UPLOAD;
    //Repartir par etage
    //this.repartirParEtage(2);
    // this.repartirParEtage(3);
    // this.repartirParEtage(4);
    this.roomsBySector = [];
    this.remplir(this.ListFM);
    //repartir par secteur
    /* this.repartirParSecteur_Planning(1);
     this.repartirParSecteur_Planning(2);
     this.repartirParSecteur_Planning(3);
     this.repartirParSecteur_Planning(4);
     this.repartirParSecteur_Planning(5);
     this.graph_essai(1);
     this.graph_essai(2);
     this.graph_essai(3);
     this.graph_essai(4);
     this.graph_essai(5);*/

    // this.download_image();
    this.path = this.path + "/" + this.utilisateur.mot_de_passe.toString() + ".jpg";
    /*  this.path.concat("/");
      this.path.concat(this.utilisateur.mot_de_passe.toString());
      this.path.concat(".jpg");*/
    console.log("path is :", this.path);
    //this.path.concat(this.utilisateur.mot_de_passe).concat("jpg");
    this.plt.ready().then(() => {
      this.loadStoredImages();
    });
  }

  /////////////////////////////////////
  //Repartir par secteur
  repartirParSecteur_Planning(secteur: number) {

    this.planning.getRoomSecteurId_Planning(secteur).subscribe(
      res => {
        if (res.succes == false) {
          //alert("Cette étage n'existe pas !!!");

        } else {
          //  this.resultat = res;
          if (secteur == 1) { this.secteur1 = res; }
          if (secteur == 2) { this.secteur2 = res; }
          if (secteur == 3) { this.secteur3 = res; }
          if (secteur == 4) { this.secteur4 = res; }
          if (secteur == 5) { this.secteur5 = res; }
          //console.log("Secteur :",secteur,"est :" ,res );
        }
      }
    );

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
  ///////////////souad  test upload image
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
      console.log("erreur de camera : ", err);
    });
    this.uploadImage(this.utilisateur.id);
  }


  uploadImage(id) {


    /*this.photos.push("V2ViZWFzeXN0ZXAgOik=");
    this.ord.push("V2ViZWFzeXN0ZXAgOik=");
    this.mutuelle.push("V2ViZWFzeXN0ZXAgOik=");*/
    //var tab = this.photos;
    //this.base64Image = "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";
    //  tab = [this.photos, this.ord, this.mutuelle];

    // console.log("taille tab : " + tab.length);

    //this.planning.uploadImage(this.base64Image,id);
    //vider les trois tableaux après upload des photos
    this.photos = [];

  }
  /*
  download_image(){
    //alert("this.utilisateur.id download: "+this.utilisateur.id);
    this.planning.DownloadFiles(this.utilisateur.id).subscribe(result => {
      console.log("id user download photo: ", this.utilisateur.id);
      console.log("resultat de download: ", result);
      let longueur = result.length;
      if (longueur > 0) {
        for (let i = 0; i < longueur; i++) {
          //console.log(  result[i]);
          result[i] = this.path.concat(result[i]);
        }
        this.photos_downloaded = result;
       // this.hide = false;
        console.log("nombres de photos downloads:  ", this.photos);
      }
  
    });
  }*/
  //Menu upload de ordonnance
  async presentActionSheet_photo() {
    const actionSheet = await this.actionSheetCtrl.create({


      buttons: [
        {
          icon: 'camera',
          text: 'Prendre une photo',
          role: 'prendre',
          handler: () => {
            this.openCamera();
            console.log('camera clicked');
          }
        }, {
          icon: 'folder',
          text: 'Ouvrir Gallery',
          role: 'choisir',
          handler: () => {
            this.pickPhoto();
            console.log('Archive clicked');
          }
        }, {
          text: 'Annuler',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await actionSheet.present();
  }

  pickPhoto() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE

    }
    this.camera.PictureSourceType.PHOTOLIBRARY;
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.base64Image = imageData;
      this.photos.push(this.base64Image);
      this.photos.reverse();

    }, (err) => {
      console.log("erreur de camera : ", err);
    });
    this.uploadImage(this.utilisateur.id);
  }
  //Fin code pour uploader l'image

  // code patrice Photo

  loadStoredImages() {
    this.storage.get(STORAGE_KEY).then(images => {
      if (images) {
        let arr = JSON.parse(images);
        this.images = [];
        for (let img of arr) {
          let filePath = this.file.dataDirectory + img;
          let resPath = this.pathForImage(filePath);
          this.images.push({ name: img, path: resPath, filePath: filePath });
        }
      }
    });
  }

  pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      let converted = this.webview.convertFileSrc(img);
      return converted;
    }
  }

  async presentToast(text) {
    const toast = await this.toastController.create({
      message: text,
      position: 'bottom',
      duration: 3000
    });
    toast.present();
  }

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: "Select Image source",
      buttons: [{
        text: 'Load from Library',
        handler: () => {
          this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: 'Use Camera',
        handler: () => {
          this.takePicture(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }

  takePicture(sourceType: PictureSourceType) {
    var options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    this.camera.getPicture(options).then(imagePath => {
      if (this.plt.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    });

  }

  createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }

  copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(success => {
      this.updateStoredImages(newFileName);
    }, error => {
      this.presentToast('Error while storing file.');
    });
  }

  updateStoredImages(name) {
    this.storage.get(STORAGE_KEY).then(images => {
      let arr = JSON.parse(images);
      if (!arr) {
        let newImages = [name];
        this.storage.set(STORAGE_KEY, JSON.stringify(newImages));
      } else {
        arr.push(name);
        this.storage.set(STORAGE_KEY, JSON.stringify(arr));
      }

      let filePath = this.file.dataDirectory + name;
      let resPath = this.pathForImage(filePath);

      let newEntry = {
        name: name,
        path: resPath,
        filePath: filePath
      };

      this.images = [newEntry, ...this.images];
      this.ref.detectChanges(); // trigger change detection cycle
    });
  }

  deleteImage(imgEntry, position) {
    this.images.splice(position, 1);

    this.storage.get(STORAGE_KEY).then(images => {
      let arr = JSON.parse(images);
      let filtered = arr.filter(name => name != imgEntry.name);
      this.storage.set(STORAGE_KEY, JSON.stringify(filtered));

      var correctPath = imgEntry.filePath.substr(0, imgEntry.filePath.lastIndexOf('/') + 1);

      this.file.removeFile(correctPath, imgEntry.name).then(res => {
        this.presentToast('File removed.');
      });
    });
  }

  startUpload(imgEntry) {
    this.file.resolveLocalFilesystemUrl(imgEntry.filePath)
      .then(entry => {
        (<FileEntry>entry).file(file => this.readFile(file))
      })
      .catch(err => {
        this.presentToast('Error while reading file.');
      });
  }

  readFile(file: any) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const formData = new FormData();
      const imgBlob = new Blob([reader.result], {
        type: file.type
      });
      //formData.append('file', imgBlob, file.name);
      let name_photo = this.utilisateur.mot_de_passe;
      //formData.append('file', imgBlob, '12345' + file.name.substring( file.name.lastIndexOf('.')));
      formData.append('file', imgBlob, name_photo + file.name.substring(file.name.lastIndexOf('.')));
      this.uploadImageData(formData);
    };
    reader.readAsArrayBuffer(file);
  }

  async uploadImageData(formData: FormData) {
    console.log("Photo uploading started ...");
    const loading = await this.loadingController.create({
      message: "Uploading image...",
    });
    await loading.present();

    //this.http.post("https://rexiagroup.com/apps/hotel/appHotel/bdd/fm/upload_photo.php", formData)
    this.http.post(LIEN_FICHIER_UPLOAD, formData)
      .pipe(
        finalize(() => {
          loading.dismiss();
          console.log("Photo uploaded cancelled");
        })
      )
      .subscribe(res => {
        if (res['success']) {
          this.presentToast('File upload complete.');
          console.log("Photo uploaded successfully");
        } else {
          this.presentToast('File upload failed.');
          console.log("Photo uploaded failed");
        }
      });
  }
  //GoFeaffecter les chambres
  GoReaffecter() {

    let navigationExtras: NavigationExtras = {
      state: {
        utilisateur: this.utilisateur
      }
    };
    this.navCtrl.navigateRoot('connecte/reaffecter', navigationExtras);
    //this.navCtrl.navigateRoot('connecte/reaffecter');
  }

  //Changement Etat de chambre
  //Jorge  Etat des chambres

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
          }
        },
        {
          text: 'Hors service',
          icon: 'construct',
          cssClass: 'hsIcon',
          handler: () => {
            this.MiseEnHS(chambre.room_num, chambre.etat);
          },
        },
        {
          text: 'Recouche',
          icon: 'checkmark-circle',
          cssClass: 'recoucheIcon',
          handler: () => {
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

    //--- actionsheet pour femmes de chambre
    const actionSheetFDC = await this.actionSheet.create({
      header: 'État de la chambre ' + chambre.room_num,
      cssClass: 'myActionSheet',
      buttons: [
        {
          text: 'Propre',
          icon: 'checkmark-circle',
          cssClass: 'propreIcon',
          handler: () => {
            this.MiseAPropre(chambre.room_num, chambre.etat);
          }
        },
        {
          text: 'Sale',
          icon: 'close',
          cssClass: 'saleIcon',
          handler: () => {
            this.MiseEnSale(chambre.room_num, chambre.etat);
          }
        },
        {
          text: 'Recouche',
          icon: 'checkmark-circle',
          cssClass: 'recoucheIcon',
          handler: () => {
            this.MiseEnRecouche(chambre.room_num, chambre.etat);
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
          text: 'Problème résolu',
          icon: 'done-all',
          handler: () => {
            this.MiseEnSansProbleme(chambre.room_num, chambre.etat);
          }
        },
        {
          text: '__________________________________________'
        },
        {
          text: 'détails des options',
          handler: () => {
            this.onLoadChambre(chambre);
          }
        }
      ]
    });

    if (this.utilisateur.is_gouvernante == true) {
      await actionSheet.present();
    } else if (this.utilisateur.is_gouvernante == false) {
      await actionSheetFDC.present();
    }

  }

  async onLoadChambre(chambre: ChambresAffectees) {

    const modal = await this.modalCtrl.create({
      component: ChambresAffecteesOptionsPage,
      componentProps: { chambre: chambre }
    });
    return await modal.present();

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
    this.planning.MiseASaleRoom(Room_num, Etat).subscribe(
      res => {
        //Rafraichir l'affichage         
        this.rafraichir();
        // console.log("La chambre est passée à propre :");
      }
    );
  }
  //Passer la chambre à sale dans la table csv et la table chambresAffecttees
  MiseEnRecouche(Room_num, Etat) {
    this.planning.MiseASaleRoom(Room_num, Etat).subscribe(
      res => {
        //Rafraichir l'affichage         
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
        //alert("MiseEnProbleme res : " + res);
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
        console.log("La chambre est prioritaire.");
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



  //////////////

  //////// Fin Changement Eat de chambre////////////////
}
