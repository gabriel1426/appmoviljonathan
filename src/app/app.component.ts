
import { Component, ViewChild } from '@angular/core';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

import { Platform, MenuController,Nav, AlertController} from 'ionic-angular';


import { HomePage } from '../pages/home/home';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = LoginPage;
 public  user; 
  public da : any;
  public nombre : any;
  public apellido : any;
  
  public imagen : any;
  public logeado :any;

  pages: Array<{title: string,icon:string, component: any,logout :boolean}>;


  constructor(
    platform: Platform,
    public menu: MenuController, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen
    ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.pages = [
      { title: 'Inicio',icon:'home', component: HomePage, logout : false },
      
      { title: 'Restaurantes',icon:'md-restaurant', component: HomePage , logout : false },
      { title: 'Deportes',icon:'md-baseball', component: HomePage , logout : false },
      { title: 'Eventos',icon:'ios-color-filter', component: HomePage , logout : false },
    
      { title: 'Logout',icon:'md-log-out', component: LoginPage , logout : true }
  
    ];
    

      
    
    
        // Verificación de logeo
          if(localStorage["User"] == null || localStorage["User"] == undefined){
              // this.user = new User("Usuario Default", "");
              // this.imagen = "assets/images/avatar.png";
        }
        else{
          this.logeado = true;
          this.user = (localStorage["User"]);
           this.nombre =this.user.nombre;
       
              console.log("nombre usuario",this.nombre);
        }
    

  }

  ngAfterViewInit() {
      this.nav.viewDidEnter.subscribe((data) => {
        var view = data.component.name;
        if(view != "IntroductionPage" && view != "UserSignup" && view != "UserLogin"){
          
            // VERIFICACIÓN DE LOGEO 
            if(localStorage["User"] == null || localStorage["User"] == undefined){
            
            }
            else{
              this.logeado = true;
              this.user = (localStorage["User"]);
              this.nombre =this.user.nombre;
             
     
            }
        }
      });
    
      // VERIFICACIÓN DE LOGEO 
      if(localStorage["User"] == null || localStorage["User"] == undefined){
        this.nav.setRoot(LoginPage);
      }
      else{
        this.logeado = true;
        this.user = (localStorage["User"]);
        this.nombre =this.user.nombre;
     
        console.log("nombre usuario",this.nombre);
        this.nav.setRoot(TabsPage);
      }
      
    }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();

/* Español
si el atributo logout is true .. borramos los datos del usuario del telefono
INGLES
If the logout attribute is true .. we delete the user data from the phone  */
      if(page.logout){
        // window.localStorage.removeItem('User');
        // window.localStorage.removeItem('Token');
        localStorage.clear();
        this.nombre = "Usuario";
        // this.apellido = "Invitado";
        
        this.logeado = false;
         this.nav.setRoot(page.component);
        }else{
        this.nav.push(page.component);
        }

    // navigate to the new page if it is not the current page
  
  }

  
  ionViewDidLoad() {
    if (localStorage["Token"]){

         this.user = JSON.parse(localStorage["User"]);
          // AppSettings.datos = JSON.stringify(localStorage["Datos"]);
        // console.log('dsiempre '+AppSettings.datos);
         this.nombre =this.user.nombre;
        //  this.apellido = AppSettings.datos.apellido;
         
        //  this.imagen = AppSettings.datos.avatar;
         
       
    }
 }

  
}

