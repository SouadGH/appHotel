import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Observable } from 'rxjs';
import { Utilisateur } from 'src/models/utilisateurModel';
import { BDD_LIEN_GET_UN_UTILISATEUR } from './config_bdd';

@Injectable()
export class UtilisateurProvider {
    constructor(public http: HttpClient) {
        // console.log('Hello CourseProvider Provider');

        console.log("BDD: ", BDD_LIEN_GET_UN_UTILISATEUR);
    }

    getUtilisateur_ID(id: number) {
        let lien = "&id=" + id;

        console.log("Lien: ", lien);

        return new Promise((resolve, reject) => {
            let result = <Observable<Utilisateur>>this.http.get(BDD_LIEN_GET_UN_UTILISATEUR + lien);
            result.subscribe(data => {
                if (data) {
                    let utilisateur = new Utilisateur(data.id, data.uuid,
                        data.nom_utilisateur,
                        data.mot_de_passe,
                        data.nom, data.prenom,
                        data.sexe, data.telephone,
                        data.is_gouvernante, data.is_reception, data.is_femme_chambre);
                    resolve(utilisateur);
                } else {
                    reject();
                }
            });

        });
    }

    getUtilisateur_TELEPHONE(telephone: number) {
        let lien = "&telephone=" + telephone;
        // console.log("===yyyyyy=========", lien);
        return new Promise((resolve, reject) => {
            let result = <Observable<Utilisateur>>this.http.get(BDD_LIEN_GET_UN_UTILISATEUR + lien);
            result.subscribe(data => {
                if (data) {
                    let utilisateur = new Utilisateur(data.id, data.uuid,
                        data.nom_utilisateur,
                        data.mot_de_passe,
                        data.nom, data.prenom,
                        data.sexe, data.telephone,
                        data.is_gouvernante, data.is_reception, data.is_femme_chambre);
                    resolve(utilisateur);
                } else {
                    reject();
                }
            });

        });
    }

    getUtilisateur_MOTDEPASSE(motdepasse: number) {
        let lien = "&mot_de_passe=" + motdepasse;
        // console.log("===yyyyyy=========", lien);
        return new Promise((resolve, reject) => {
            let result = <Observable<Utilisateur>>this.http.get(BDD_LIEN_GET_UN_UTILISATEUR + lien);
            result.subscribe(data => {
                if (data) {
                    let utilisateur = new Utilisateur(data.id, data.uuid,
                        data.nom_utilisateur,
                        data.mot_de_passe,
                        data.nom, data.prenom,
                        data.sexe, data.telephone,
                        data.is_gouvernante, data.is_reception, data.is_femme_chambre);
                    resolve(utilisateur);
                } else {
                    reject();
                }
            });

        });
    }
}