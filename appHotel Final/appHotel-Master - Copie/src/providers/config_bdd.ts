/* fichier regroupant toutes les variables pour pouvoir récupérer les données 
   plus facilement sur la base de doonées.
   */


export let BDD_LIEN_SERVEUR = "http://localhost/appHotel/";
//export let BDD_LIEN_SERVEUR = "https://rexiagroup.com/apps/hotel/appHotel/";

export let BDD_LIEN_BDD = BDD_LIEN_SERVEUR + "bdd/";
export let BDD_LIEN_IMAGE = BDD_LIEN_SERVEUR + "img/";
// --------------------------------------------------- //
// -------------------- UTILISATEURS -------------------- //
// --------------------------------------------------- //
export let BDD_LIEN_FICHIER_UTILISATEURS = BDD_LIEN_BDD + "utilisateurs/utilisateur_convertJson.php?";
export let BDD_LIEN_GET_UN_UTILISATEUR = BDD_LIEN_FICHIER_UTILISATEURS + "get=ok";


//Exportation du fichier csv to BD
export let LIEN_DATA_ROOM = BDD_LIEN_BDD + "room" ;

export let LIEN_ADD_ROOMS = LIEN_DATA_ROOM + "/add_rooms.php";
export let LIEN_GET_FREE_DIRTY_ROOMS = LIEN_DATA_ROOM + "/get_rooms_free_dirty.php";
export let LIEN_GET_FREE_CLEAN_ROOMS = LIEN_DATA_ROOM + "/get_rooms_free_clean.php";
export let LIEN_GET_OCCUPIED_DIRTY_ROOMS = LIEN_DATA_ROOM + "/get_rooms_occupied_dirty.php";
export let LIEN_GET_OCCUPIED_CLEAN_ROOMS = LIEN_DATA_ROOM + "/get_rooms_occupied_clean.php";
export let LIEN_GET_HS_ROOMS = LIEN_DATA_ROOM + "/get_rooms_hs.php";
export let LIEN_GET_ALL_ROOMS = LIEN_DATA_ROOM + "/get_all_rooms.php";
export let LIEN_GET_FLOOR_ROOMS =  LIEN_DATA_ROOM + "/get_floor_rooms.php";



export let LIEN_UPDATE_ROOM_CLEAN = LIEN_DATA_ROOM +"/update_room_clean.php";
export let LIEN_UPDATE_ROOM_DIRTY = LIEN_DATA_ROOM +"/update_room_dirty.php";
export let LIEN_UPDATE_ROOM_HS =  LIEN_DATA_ROOM + "/update_room_hs.php";
//modif jorge
export let LIEN_UPDATE_ROOM_ISSUE = LIEN_DATA_ROOM + "/update_room_issue.php";
export let LIEN_UPDATE_ROOM_NONE_ISSUE =LIEN_DATA_ROOM + "/update_room_none_issue.php";
export let LIEN_UPDATE_ROOM_PRIORITY = LIEN_DATA_ROOM + "/update_room_priority.php";
export let LIEN_UPDATE_ROOM_NONE_PRIORITY = LIEN_DATA_ROOM + "/update_room_none_priority.php";
export let LIEN_UPDATE_ROOM_GOUVERNANTE_CHECKED = LIEN_DATA_ROOM + "/update_room_gouvernanteChecked.php";
export let LIEN_UPDATE_ROOM_NONE_GOUVERNANTE_CHECKED = LIEN_DATA_ROOM + "/update_room_none_gouvernanteChecked.php";

//-- options room
export let LIEN_UPDATE_ROOM_LITBEBE = LIEN_DATA_ROOM + "/update_room_litbebe.php";
export let LIEN_UPDATE_ROOM_PORTEOUVERTE = LIEN_DATA_ROOM + "/update_room_porteOuverte.php";
export let LIEN_UPDATE_ROOM_PORTEFERMEE = LIEN_DATA_ROOM + "/update_room_porteFermee.php";
export let LIEN_UPDATE_ROOM_CANAPEOUVERT = LIEN_DATA_ROOM + "/update_room_canapeOuvert.php";
export let LIEN_UPDATE_ROOM_CANAPEFERME = LIEN_DATA_ROOM + "/update_room_canapeFerme.php";
export let LIEN_UPDATE_ROOM_LITITALIENNE = LIEN_DATA_ROOM + "/update_room_litItalienne.php";
export let LIEN_UPDATE_ROOM_CADEAUCHOCOLAT = LIEN_DATA_ROOM + "/update_room_cadeauchocolat.php";
export let LIEN_UPDATE_ROOM_CADEAUCHAMPAGNE = LIEN_DATA_ROOM + "/update_room_cadeauchampagne.php";
export let LIEN_UPDATE_ROOM_CADEAUFLEUR = LIEN_DATA_ROOM + "/update_room_cadeaufleur.php";
export let LIEN_UPDATE_ROOM_DETAILSROOM = LIEN_DATA_ROOM + "/details_room.php"


////////////////////////////////////////////////////////////

//////////////////////Femme de Ménage

export let LIEN_DATA_FM =  BDD_LIEN_BDD + "fm" ;
export let LIEN_GET_ALL_FM = LIEN_DATA_FM + "/get_all_fm.php";
export let LIEN_ADD_ROOMS_FM = LIEN_DATA_FM + "/add_rooms_fm.php";
export let LIEN_ADD_ROOMS_REAFFECTED = LIEN_DATA_FM + "/add_rooms_reaffected.php";

export let LIEN_GET_FM_CODE = LIEN_DATA_FM + "/get_fm_code.php";

export let LIEN_GET_PLANNING_EXISTE = LIEN_DATA_FM + "/get_planning_existe.php";
export let LIEN_DELETE_ROOMS_FM = LIEN_DATA_FM + "/delete_planning.php";
export let LIEN_DELETE_FM = LIEN_DATA_FM + "/desactiver_fm.php";
export let LIEN_ACTIVER_FM = LIEN_DATA_FM + "/activer_fm.php";
export let LIEN_UPDATE_FM = LIEN_DATA_FM + "/update_fm.php";
export let LIEN_ADD_FM = LIEN_DATA_FM + "/add_fm.php";
export let LIEN_GET_ALL_FM_OFF = LIEN_DATA_FM + "/get_all_fm_desactiver.php";
export let LIEN_GET_ROOMS_AFFECTED_DFC =  LIEN_DATA_FM + "/get_rooms_fm_id.php";
export let LIEN_GET_ROOMS_AFFECTED_SECTEUR_ID =LIEN_DATA_FM + "/get_rooms_secteur_id.php" ;
export let LIEN_GET_ROOMS_NOT_AFFECTED_DFC = LIEN_DATA_FM + "/get_rooms_not_affected.php" ;

//-------------------------------UPLOADER FILES-- test souad--------------------------//
/*export let LIEN_FICHIER_UPLOAD = LIEN_DATA_FM + "/upload" ;
export let LIEN_PATH_FILES = LIEN_FICHIER_UPLOAD + "/images/" ;
export let LIEN_UPLOAD_FILES = LIEN_FICHIER_UPLOAD +"/uploader.php";
export let LIEN_DOWNLOAD_FILES = LIEN_FICHIER_UPLOAD +"/downloader.php";*/

//-------------------------------UPLOADER FILES Patrice--------------------------//
export let LIEN_FICHIER_UPLOAD = LIEN_DATA_FM +"/photos" ;
export let LIEN_PATH_FILES = LIEN_DATA_FM + "/upload_photo.php" ;

export let LIEN_EXIST_FILE =LIEN_DATA_FM + "/exist_photo.php" ;
//export let LIEN_UPLOAD_FILES = LIEN_FICHIER_UPLOAD +"/upload_photo.php";

//https://rexiagroup.com/apps/hotel/appHotel/bdd/fm/upload_photo.php


