import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PromocionesdetallePage } from './promocionesdetalle';

@NgModule({
  declarations: [
    PromocionesdetallePage,
  ],
  imports: [
    IonicPageModule.forChild(PromocionesdetallePage),
  ],
})
export class PromocionesdetallePageModule {}
