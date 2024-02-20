import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { IonicStorageModule } from '@ionic/storage';
import { ChambresAffecteesOptionsPage } from './chambresaffecteesoptions.page';

const routes: Routes = [
  {
    path: '',
    component: ChambresAffecteesOptionsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    IonicStorageModule.forRoot()
  ],
  declarations: [ChambresAffecteesOptionsPage]
})
export class ChambresAffecteesOptionsPageModule {}
