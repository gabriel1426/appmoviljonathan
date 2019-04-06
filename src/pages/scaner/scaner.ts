import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  constructor(public navCtrl: NavController, public navParams: NavParams, private qrScanner: QRScanner) {
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
