import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComercioPage } from './comercio';

@NgModule({
  declarations: [
    ComercioPage,
  ],
  imports: [
    IonicPageModule.forChild(ComercioPage),
  ],
})
export class ComercioPageModule {}
