
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
  public email : any;
  public cedula: any;
  public celular: any;
  public direccion : any;
  public ciudad_empleado : any;
  public monto : any;
  public id_empresa: any;
  public id_usuario : any;
  public id_empleado : any;
  public fecha_nacimiento : any;
  public sexo : any;
  public bloqueo : any;
  public apellido : any;
  public imagen : any;
  public logeado :any;

  pages: Array<{title: string,icon:string, component: any,logout :boolean}>;


  constructor(
    public platform: Platform,
   
    public menu: MenuController, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen
    ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // statusBar.styleDefault();
      // splashScreen.hide();
    })

    this.pages = [
      { title: 'Inicio',icon:'home', component: TabsPage, logout : false },
      
      { title: 'Home',icon:'md-home', component: TabsPage , logout : false },
 
      { title: 'Logout',icon:'md-log-out', component: LoginPage , logout : true }
  
    ];
    

      
    
    
        // Verificación de logeo
          if(localStorage["User"] == null || localStorage["User"] == undefined){
              // this.user = new User("Usuario Default", "");
              // this.imagen = "assets/images/avatar.png";
        }
        else{
          this.logeado = true;
          this.nombre =localStorage["nombre"];
          this.email =localStorage["email"];
          this.cedula =localStorage["cedula"];
          this.celular =localStorage["celular"];
          this.direccion =localStorage["direccion"];
          this.ciudad_empleado =localStorage["ciudad_empleado"];
          this.monto =localStorage["monto"];
          this.id_empresa =localStorage["id_empresa"];
          this.id_usuario =localStorage["id_usuario"];
          this.id_empleado =localStorage["id_empleado"];
          this.fecha_nacimiento =localStorage["fecha_nacimiento"];
          this.sexo =localStorage["sexo"];
          this.bloqueo =localStorage["bloqueo"];
              console.log("nombre usuario",this.nombre);
        }
    

  }
  initializeApp() {
    this.platform.ready().then(() => {
      setTimeout(() => {
        this.splashScreen.hide();
      }, 100);
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
     // this.splashScreen.hide();
         var notificationOpenedCallback = function(jsonData) {
    console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
  };

  /*window["plugins"].OneSignal
    .startInit("f93e9465-214d-4795-ace2-b0607c946f7b", "258118657186")
    .handleNotificationOpened(notificationOpenedCallback)
    .endInit();
*/
      
    });
  }
  ngAfterViewInit() {
      this.nav.viewDidEnter.subscribe((data) => {
        var view = data.component.name;
        if(view != "IntroductionPage" && view != "UserSignup" && view != "UserLogin"){
          
            // VERIFICACIÓN DE LOGEO 
            if(localStorage["token"] == null || localStorage["token"] == undefined){
            
            }
            else{
              this.logeado = true;
              this.nombre =localStorage["nombre"];
           this.email =localStorage["email"];
           this.cedula =localStorage["cedula"];
           this.celular =localStorage["celular"];
           this.direccion =localStorage["direccion"];
           this.ciudad_empleado =localStorage["ciudad_empleado"];
           this.monto =localStorage["monto"];
           this.id_empresa =localStorage["id_empresa"];
           this.id_usuario =localStorage["id_usuario"];
           this.id_empleado =localStorage["id_empleado"];
           this.fecha_nacimiento =localStorage["fecha_nacimiento"];
           this.sexo =localStorage["sexo"];
           this.bloqueo =localStorage["bloqueo"];
     
            }
        }
      });
    
      // VERIFICACIÓN DE LOGEO 
      if(localStorage["token"] == null || localStorage["token"] == undefined){
        this.nav.setRoot(LoginPage);
      }
      else{
        this.logeado = true;
        this.nombre =localStorage["nombre"];
        this.email =localStorage["email"];
        this.cedula =localStorage["cedula"];
        this.celular =localStorage["celular"];
        this.direccion =localStorage["direccion"];
        this.ciudad_empleado =localStorage["ciudad_empleado"];
        this.monto =localStorage["monto"];
        this.id_empresa =localStorage["id_empresa"];
        this.id_usuario =localStorage["id_usuario"];
        this.id_empleado =localStorage["id_empleado"];
        this.fecha_nacimiento =localStorage["fecha_nacimiento"];
        this.sexo =localStorage["sexo"];
        this.bloqueo =localStorage["bloqueo"];

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
        
        window.localStorage.removeItem('token');
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
    if (localStorage["token"]){
      this.logeado = true;
     
    
         //  this.nombre =this.user.nombre
           this.nombre =localStorage["nombre"];
           this.email =localStorage["email"];
           this.cedula =localStorage["cedula"];
           this.celular =localStorage["celular"];
           this.direccion =localStorage["direccion"];
           this.ciudad_empleado =localStorage["ciudad_empleado"];
           this.monto =localStorage["monto"];
           this.id_empresa =localStorage["id_empresa"];
           this.id_usuario =localStorage["id_usuario"];
           this.id_empleado =localStorage["id_empleado"];
           this.fecha_nacimiento =localStorage["fecha_nacimiento"];
           this.sexo =localStorage["sexo"];
           this.bloqueo =localStorage["bloqueo"];
      
         
       
    }
 }

  
}

