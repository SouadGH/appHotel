export class Utilisateur {
    id: number;
    uuid:string;
    nom_utilisateur: string;
    mot_de_passe: string;
    nom: string;
    prenom: string;
    sexe: string;
    telephone: string;
    is_gouvernante:boolean;
    is_reception:boolean;
    is_femme_chambre:boolean;

    constructor(id,uuid, nom_utilisateur, mot_de_passe, nom, prenom, sexe,
        telephone, is_gouvernante, is_reception, is_femme_chambre){
            this.id=id;
            this.uuid=uuid;
            this.nom_utilisateur=nom_utilisateur;
            this.mot_de_passe=mot_de_passe;
            this.nom=nom;
            this.prenom=prenom;
            this.sexe=sexe;
            this.telephone=telephone;
            this.is_gouvernante=is_gouvernante;
            this.is_reception=is_reception;
            this.is_femme_chambre=is_femme_chambre;
    }

}