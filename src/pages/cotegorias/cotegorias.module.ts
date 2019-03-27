import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CotegoriasPage } from './cotegorias';

@NgModule({
  declarations: [
    CotegoriasPage,
  ],
  imports: [
    IonicPageModule.forChild(CotegoriasPage),
  ],
})
export class CotegoriasPageModule {}
