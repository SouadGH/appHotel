import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OptionsRoomPage } from './options-room.page';
//import { SingleRoomOptionsPage } from '../single-room-options/single-room-options.page';

const routes: Routes = [
  {
    path: '',
    component: OptionsRoomPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OptionsRoomPage]
})
export class OptionsRoomPageModule {}
