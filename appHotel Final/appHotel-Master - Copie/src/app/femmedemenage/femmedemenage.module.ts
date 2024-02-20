import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FemmedemenagePage } from './femmedemenage.page';

const routes: Routes = [
  {
    path: '',
    component: FemmedemenagePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FemmedemenagePage]
})
export class FemmedemenagePageModule {}
