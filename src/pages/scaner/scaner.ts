import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { BarcodeScanner,BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
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
  products = {
  "plu":"01234567895",
  "name":"Gaming DDR5 RAM 16GB",
  "price":76,
  "desc":"Gaming DDR5 RAM 16GB PC-128000 For x64 PC"
}
  options:BarcodeScannerOptions;
  encodText:string='';
  encodedData:any={};
  scannedData:any={};
  selectedProduct;
  constructor(private alertController:AlertController,
    public navCtrl: NavController,

     public navParams: NavParams,
     private scanner: BarcodeScanner) {
    // this.leerCodigo();
  }
scan(){
  this.options= {
    prompt: 'Scan you barcode'
  };
    this.scanner.scan(this.options).then((data)=>{
      this.scannedData = data;
      alert( data);
    },(err)=>{
      console.log('Error:', err);
    })
}

encode(){
  this.scanner.encode(this.scanner.Encode.TEXT_TYPE,this.encodText).then((data)=>{
    this.encodedData = data;
  },(err)=>{
    console.log('error:', err)
  })
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad ScanerPage');
  }

  scan2() {
    this.selectedProduct = {};
    this.scanner.scan().then((barcodeData) => {
      this.encodedData = barcodeData;
    
    }, (err) => {
     console.log();
    });
  }

  // leerCodigo () {
  //   // Pedir permiso de utilizar la camara
  //   this.qrScanner.prepare().then((status: QRScannerStatus) => {
  //     if (status.authorized) {
  //       // el permiso fue otorgado
  //       // iniciar el escaneo
  //       let scanSub = this.qrScanner.scan().subscribe((texto: string) => {
  //         console.log('Scanned something', texto);
  //         let alert1 = this.alertController.create({
  //           title: 'Error!',
  //           subTitle: texto,
  //         buttons: ['OK']
  //         });
  //         alert1.present();
  //         this.qrScanner.hide(); // esconder el preview de la camara
  //         scanSub.unsubscribe(); // terminar el escaneo
  //       }); 
  
  //     } else if (status.denied) {
  //       // el permiso no fue otorgado de forma permanente
  //       // debes usar el metodo QRScanner.openSettings() para enviar el usuario a la pagina de configuracion
  //       // desde ahí podrán otorgar el permiso de nuevo
  //     } else {
  //       // el permiso no fue otorgado de forma temporal. Puedes pedir permiso de en cualquier otro momento
  //     }
  //   }) .catch((e: any) => console.log('El error es: ', e));
  // }
  
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
