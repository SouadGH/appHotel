export class FemmeDeMenage {
    id_FM:number;	
	nom: string;
    prenom: string;    
    presence: boolean;
    secteur: number; 
    etage :number; 
    code:string;   		
    is_active: boolean;
    
    
    constructor(id_FM,nom, prenom, presence, secteur, etage, code, is_active){
            this.id_FM = id_FM;          
            this.nom=nom;
            this.prenom=prenom;
            this.presence = presence;
            this.secteur = secteur;  
            this.etage = etage;
            this.code= code;
            this.is_active = is_active;       
    }
  }