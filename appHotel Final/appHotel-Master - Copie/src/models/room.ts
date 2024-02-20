//import { Datetime } from 'ionic/core/dist/types/components/datetime/datetime';

//import { DateTime } from "ionic-angular";

export class Room {
    id:number;
	
	room_id: number;
    room_num: number;    
    HXXType: string;
    ResidentOrGuest: string;    
    Etat:string;
    Lign_date:Date;    
	PassedNights:number;
	RemainingNights:number;
    StayStatus:string;    
    RoomStatusAfterH12: string;
    
	Floor_Label: number;
	Floor_Id: number;
	LinkSP: number;
    Date_created:Date;
    
    is_litBebe: number;
    is_porteOuverte: number;
    is_porteFermee: number;
    is_canapeOuvert: number;
    is_canapeFerme: number;
    is_litItalienne: number;
    is_cadeauChocolat: number;
    is_cadeauChampagne: number;
    is_cadeauFleur: number;
  }