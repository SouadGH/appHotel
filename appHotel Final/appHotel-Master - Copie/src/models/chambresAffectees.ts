export class ChambresAffectees {
    id: number
    id_FM:number;	
    room_num: number; 
    etat:string;
    etage: number;
    secteur: number;
    date_created:Date;    

    is_litBebe: number;
    is_porteOuverte: number;
    is_porteFermee: number;
    is_canapeOuvert: number;
    is_canapeFerme: number;
    is_litItalienne: number;
    is_cadeauChocolat: number;
    is_cadeauChampagne: number;
    is_cadeauFleur: number;
	
    
    constructor(id,id_FM,room_num,Etat ,etage,secteur,Date_created, is_litBebe, is_porteOuverte, 
        is_porteFermee, is_canapeOuvert, is_canapeFerme, is_litItalienne, is_cadeauChocolat, 
        is_cadeauChampagne, is_cadeauFleur){
            
            this.id = id;
            this.id_FM = id_FM;          
            this.room_num=room_num;
            this.etat=Etat;
            this.secteur = secteur;
            this.etage = etage;  
            this.date_created = Date_created;
            this.is_litBebe = is_litBebe;
            this.is_porteOuverte = is_porteOuverte;
            this.is_porteFermee = is_porteFermee;
            this.is_canapeOuvert = is_canapeOuvert;
            this.is_canapeFerme = is_canapeFerme; 
            this.is_litItalienne = is_litItalienne;
            this.is_cadeauChocolat = is_cadeauChocolat;  
            this.is_cadeauChampagne = is_cadeauChampagne;
            this.is_cadeauFleur = is_cadeauFleur; 
    }

  }