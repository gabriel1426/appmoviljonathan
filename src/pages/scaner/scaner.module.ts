import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScanerPage } from './scaner';

@NgModule({
  declarations: [
    ScanerPage,
  ],
  imports: [
    IonicPageModule.forChild(ScanerPage),
  ],
})
export class ScanerPageModule {}
