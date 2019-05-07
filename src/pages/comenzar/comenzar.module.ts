import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComenzarPage } from './comenzar';

@NgModule({
  declarations: [
    ComenzarPage,
  ],
  imports: [
    IonicPageModule.forChild(ComenzarPage),
  ],
})
export class ComenzarPageModule {}
