import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { Subscription} from 'rxjs/Subscription';


/**
 * Generated class for the ComenzarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comenzar',
  templateUrl: 'comenzar.html',

})


export class ComenzarPage {
  @ViewChild(Slides) slides: Slides;
  valor_inicial=1;

  connected: Subscription;
  disconnected: Subscription;

  constructor(private toast: ToastController,
     private network: Network,
    public navCtrl: NavController, 
    public navParams: NavParams) {
   this.connect()
  }

  // toggleVisible() {
  //   this.visibleState = (this.visibleState == 'visible') ? 'invisible' : 'visible';
  // }

  ionViewDidEnter() {
    this.connected = this.network.onConnect().subscribe(data => {
      console.log(data)
      this.displayNetworkUpdate(data.type);
    }, error => console.error(error));
   
    this.disconnected = this.network.onDisconnect().subscribe(data => {
      console.log(data)
      this.displayNetworkUpdate(data.type);
    }, error => console.error(error));
  }
ionViewWillLeave(){
  this.connected.unsubscribe();
  this.disconnected.unsubscribe();
}
  displayNetworkUpdate(connectionState: string){
    let networkType = this.network.type;
    this.toast.create({
      message: `You are now ${connectionState} via ${networkType}`,
      duration: 3000
    }).present();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ComenzarPage');
  }
  login(){
    this.navCtrl.push(LoginPage);
  }

  isBeginning(event){

    if(this.slides.isBeginning()){
      this.valor_inicial=1;
    }else{
      this.valor_inicial=2;
    }
    if(this.slides.isEnd()){
      this.valor_inicial=3;
    }
    
    console.log(event);
  }

  slideNext(velocidad){
    this.slides.slideNext(velocidad);
    if(this.slides.isBeginning()){
      this.valor_inicial=1;
    }else{
      this.valor_inicial=2;
    }
    if(this.slides.isEnd()){
      this.valor_inicial=3;
    }
  }

  slidePrev(velocidad){
    this.slides.slidePrev(velocidad);
    if(this.slides.isBeginning()){
      this.valor_inicial=1;
    }else{
      this.valor_inicial=2;
    }
    if(this.slides.isEnd()){
      this.valor_inicial=3;
    }
  }

  goToSlide(){
    this.slides.slideTo(3, 500);
  }

connect(){
 // watch network for a disconnection
let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
  console.log('network was disconnected :-(');
});

// stop disconnect watch
disconnectSubscription.unsubscribe();


// watch network for a connection
let connectSubscription = this.network.onConnect().subscribe(() => {
  console.log('network connected!');
  // We just got a connection but we need to wait briefly
   // before we determine the connection type. Might need to wait.
  // prior to doing any api requests as well.
  setTimeout(() => {
    if (this.network.type === 'wifi') {
      console.log('we got a wifi connection, woohoo!');
    }
  }, 3000);
});

// stop connect watch
connectSubscription.unsubscribe();
}
    
}
