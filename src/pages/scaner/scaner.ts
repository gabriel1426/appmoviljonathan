import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
/**
 * Generated class for the ScanerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scaner',
  templateUrl: 'scaner.html',
})
export class ScanerPage {
  scanData : {};
  scanSub:any;
  valor;
  constructor(private alertCtrl:AlertController,public navCtrl: NavController, public navParams: NavParams, private qrScanner: QRScanner) {
    this.scaner();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScanerPage');
  }

  scaner(){
    this.qrScanner.prepare()
    .then((status: QRScannerStatus) => {
      if (status.authorized) {
        console.log('Camera Permission Given');
         this.scanSub = this.qrScanner.scan().subscribe((text: string) => {
         console.log('Scanned something', text);
        this.valor= text;
        let alert1 = this.alertCtrl.create({
          title: 'Mensaje Enviado!',
          subTitle: 'Su mensaje ha sido enviado satisfactoriamente!',
        // buttons: ['OK']
        });
         this.qrScanner.hide();
         this.scanSub.unsubscribe(); 
        
        });

        this.qrScanner.show();
      } else if (status.denied) {
        console.log('Camera permission denied');
      } else {
        console.log('Permission denied for this runtime.');
      }
    })
    .catch((e: any) => console.log('Error is', e));
  }

  
  showCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
  }
  
  hideCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
  }

      ionViewWillEnter(){
        this.showCamera();
    }
    ionViewWillLeave(){
        this.hideCamera(); 
    }
}
