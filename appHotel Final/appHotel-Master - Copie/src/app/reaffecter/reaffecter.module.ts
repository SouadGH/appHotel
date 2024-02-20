import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ReaffecterPage } from './reaffecter.page';
import { DragulaModule } from 'ng2-dragula';

const routes: Routes = [
  {
    path: '',
    component: ReaffecterPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DragulaModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ReaffecterPage]
})
export class ReaffecterPageModule {}
