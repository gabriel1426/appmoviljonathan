import { FormulariocompraPage } from './../pages/formulariocompra/formulariocompra';

import { Component, ViewChild } from '@angular/core';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { EditarperfilPage } from '../pages/editarperfil/editarperfil';
import { LoginPage } from '../pages/login/login';
import { ComenzarPage } from '../pages/comenzar/comenzar';
import { OneSignal } from '@ionic-native/onesignal';
import { Platform, MenuController,Nav, AlertController} from 'ionic-angular';
import { ValorapagarPage } from '../pages/valorapagar/valorapagar';
// import { FormulariocompraPage } from '../pages/FormulariocompraPage/FormulariocompraPage';
import { CompraexitosaPage } from '../pages/compraexitosa/compraexitosa';
import { UsersProvider } from './../providers/users/users';
import { HomeProvider } from './../providers/home/home';
import { HomePage } from '../pages/home/home';
import { App } from 'ionic-angular/components/app/app';
import { timer } from 'rxjs/observable/timer';
import { ActualizardatosPage } from '../pages/actualizardatos/actualizardatos';
import { HistorialPage } from '../pages/historial/historial';

var datos;
var user;
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = ComenzarPage;

  public datos_monto;
  public  user; 
  public da : any;
  public letras : any;
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
  public datos:any=[];
  pages: Array<{title: string,icon:string, component: any,logout :boolean}>;


  constructor(
    public HomeProvider:HomeProvider,
    public usersprovider:UsersProvider,
    public platform: Platform,
   public AlertController:AlertController,
    public menu: MenuController, 
    public statusBar: StatusBar, 
    private oneSignal: OneSignal,
    public splashScreen: SplashScreen,
    public app: App
    ) {
    platform.ready().then(() => {
    //   this.platform.registerBackButtonAction(() => {
    //     app.navPop();
    // })
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // statusBar.styleDefault();
      // splashScreen.hide();
      // this.handlerNotifications();
      // this.initializeApp();
    })

    this.pages = [
      // { title: 'Inicio',icon:'https://img.icons8.com/clouds/55/000000/home-page.png', component: ActualizardatosPage, logout : false },
      
      { title: 'Perfil',icon:'https://img.icons8.com/clouds/55/000000/user.png', component: EditarperfilPage , logout : false },
 
      { title: 'Logout',icon:'https://img.icons8.com/clouds/55/000000/exit.png', component: ComenzarPage , logout : true }
  
    ];
    

      
    
    
        // Verificación de logeo
          if(localStorage["User"] == null || localStorage["User"] == undefined){
              // this.user = new User("Usuario Default", "");
              // this.imagen = "assets/images/avatar.png";
        }
        else{
          console.log("Verificación de logeo()");
          this.logeado = true;
          this.usersprovider.user(localStorage["id_usuario"])
          .then(data => {
            console.log("data user act",datos = data);
            user = datos.user[0];
            console.log("token",localStorage["token"]= datos.token);
            if( user.nombre != null){
              console.log("nombre",localStorage["nombre"] = user.nombre);
            }
            if(user.email != null)console.log("email",localStorage["email"] = user.email);
            if(user.email != null)console.log("direccion",localStorage["direccion"] = user.direccion);
        
            if(user.cedula != null)console.log("cedula",localStorage["cedula"] = user.cedula);
            // if(user.monto != null){console.log("monto",localStorage["monto"] = user.monto);}
            if(user.id_usuario != null)console.log("id_usuario",localStorage["id_usuario"] = user.id_usuario);
            if(user.id_empresa != null)console.log("id_empresa",localStorage["id_empresa"] = user.id_empresa);
            if(user.id != null)console.log("id_empleado",localStorage["id_empleado"] = user.id);
            if(user.celular != null)console.log("celular",localStorage["celular"] = user.celular);
            if(user.fecha_nacimiento != null)console.log("fecha_nacimiento",localStorage["fecha_nacimiento"] = user.fecha_nacimiento);
            if(user.sexo != null)console.log("sexo",localStorage["sexo"] = user.sexo);
            if(user.ciudad != null)console.log("ciudad_empleado",localStorage["ciudad_empleado"] = datos.ciudad);
            if(user.bloqueo != null)console.log("bloqueo",localStorage["bloqueo"] = user.bloqueo);
        
          })

          this.HomeProvider.getMonto(localStorage["id_empleado"])
        .then(data => {
          this.datos_monto = data;
          this.monto = this.datos_monto.data;
         
      console.log("monto  data",this.monto);
        },err=>{
          let alert1 = this.AlertController.create({
            title: 'Error!',
            subTitle: 'No pudo conectar con el servidor!',
          buttons: ['OK']
          });
          alert1.present();
         
        })
        
          this.nombre =localStorage["nombre"];
          this.email =localStorage["email"];
          this.cedula =localStorage["cedula"];
          this.celular =localStorage["celular"];
          this.direccion =localStorage["direccion"];
          this.ciudad_empleado =localStorage["ciudad_empleado"];
          // this.monto =localStorage["monto"];
          this.id_empresa =localStorage["id_empresa"];
          this.id_usuario =localStorage["id_usuario"];
          this.id_empleado =localStorage["id_empleado"];
          this.fecha_nacimiento =localStorage["fecha_nacimiento"];
          this.sexo =localStorage["sexo"];
          this.bloqueo =localStorage["bloqueo"];

          var palabras = this.nombre,
          resultado= palabras.replace(/[A-Za-z]+/g, function(match){ return (match.trim()[0]);}); 
        
          console.log(resultado.replace(/\s/g, ''));
          if(resultado.length <= 2){
            this.letras = resultado;
          }else{
            this.letras = resultado.substr(0, 3);
          }
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
      this.handlerNotifications();
     // this.splashScreen.hide();
         var notificationOpenedCallback = function(jsonData) {
    console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
  };

    });
  }
  private handlerNotifications(){
    this.oneSignal.startInit('f067ec3a-2075-45b3-a9b4-38edd3f1489f', '121145930412');
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
    this.oneSignal.handleNotificationOpened()
    .subscribe(jsonData => {
      let alert = this.AlertController.create({
        title: jsonData.notification.payload.title,
        subTitle: jsonData.notification.payload.body,
        buttons: ['OK']
      });
      alert.present();
      console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    });
    this.oneSignal.endInit();
  }
  ngAfterViewInit() {
    console.log("ngAfterViewInit()");
      this.nav.viewDidEnter.subscribe((data) => {
        var view = data.component.name;
        if(view != "IntroductionPage" && view != "UserSignup" && view != "UserLogin"){
          
            // VERIFICACIÓN DE LOGEO 
            if(localStorage["token"] == null || localStorage["token"] == undefined){
            
            }
            else{


        this.usersprovider.user(localStorage["id_usuario"])
        .then(data => {
        console.log("data user act",datos = data);
        user = datos.data[0];
        console.log("token",localStorage["token"]= datos.token);
        if( user.nombre != null){
          console.log("nombre",localStorage["nombre"] = user.nombre);
        }
        // if(user.email != null)console.log("email",localStorage["email"] = user.email);
        // if(user.email != null)console.log("direccion",localStorage["direccion"] = user.direccion);
        if(user.cedula != null)console.log("cedula",localStorage["cedula"] = user.cedula);
        if(user.monto != null){
          // console.log("monto",localStorage["monto"] = user.monto);
          console.log("monto",this.monto  = user.monto);
        }
        // if(user.id_usuario != null)console.log("id_usuario",localStorage["id_usuario"] = user.id_usuario);
        // if(user.id_empresa != null)console.log("id_empresa",localStorage["id_empresa"] = user.id_empresa);
        // if(user.id != null)console.log("id_empleado",localStorage["id_empleado"] = user.id);
        if(user.celular != null)console.log("celular",localStorage["celular"] = user.celular);
        if(user.fecha_nacimiento != null)console.log("fecha_nacimiento",localStorage["fecha_nacimiento"] = user.fecha_nacimiento);
        if(user.sexo != null)console.log("sexo",localStorage["sexo"] = user.sexo);
        if(user.ciudad != null)console.log("ciudad_empleado",localStorage["ciudad_empleado"] = datos.ciudad);
        if(user.bloqueo != null)console.log("bloqueo",localStorage["bloqueo"] = user.bloqueo);
    
      })





              this.logeado = true;
              this.nombre =localStorage["nombre"];
           this.email =localStorage["email"];
           this.cedula =localStorage["cedula"];
           this.celular =localStorage["celular"];
           this.direccion =localStorage["direccion"];
           this.ciudad_empleado =localStorage["ciudad_empleado"];
          //  this.monto =localStorage["monto"];
           this.id_empresa =localStorage["id_empresa"];
           this.id_usuario =localStorage["id_usuario"];
           this.id_empleado =localStorage["id_empleado"];
           this.fecha_nacimiento =localStorage["fecha_nacimiento"];
           this.sexo =localStorage["sexo"];
           this.bloqueo =localStorage["bloqueo"];
           var palabras = this.nombre,
           resultado= palabras.replace(/[A-Za-z]+/g, function(match){ return (match.trim()[0]);}); 
         
           console.log(resultado.replace(/\s/g, ''));
           if(resultado.length <= 2){
             this.letras = resultado;
           }else{
             this.letras = resultado.substr(0, 3);
           }
               console.log("nombre usuario",this.nombre)
            }
        }
      });
    
      // VERIFICACIÓN DE LOGEO 
      if(localStorage["token"] == null || localStorage["token"] == undefined){
        this.nav.setRoot(ComenzarPage);
      }
      else{
        this.HomeProvider.getMonto(localStorage["id_empleado"])
        .then(data => {
          this.datos_monto = data;
          this.monto = this.datos_monto.data;
         
      console.log("monto  data",this.monto);
        },err=>{
          let alert1 = this.AlertController.create({
            title: 'Error!',
            subTitle: 'No pudo conectar con el servidor!',
          buttons: ['OK']
          });
          alert1.present();
         
        })

        this.logeado = true;
        this.nombre =localStorage["nombre"];
        this.email =localStorage["email"];
        this.cedula =localStorage["cedula"];
        this.celular =localStorage["celular"];
        this.direccion =localStorage["direccion"];
        this.ciudad_empleado =localStorage["ciudad_empleado"];
        // this.monto =localStorage["monto"];
        this.id_empresa =localStorage["id_empresa"];
        this.id_usuario =localStorage["id_usuario"];
        this.id_empleado =localStorage["id_empleado"];
        this.fecha_nacimiento =localStorage["fecha_nacimiento"];
        this.sexo =localStorage["sexo"];
        this.bloqueo =localStorage["bloqueo"];
        var palabras = this.nombre,
        resultado= palabras.replace(/[A-Za-z]+/g, function(match){ return (match.trim()[0]);}); 
      
        console.log(resultado.replace(/\s/g, ''));
        if(resultado.length <= 2){
          this.letras = resultado;
        }else{
          this.letras = resultado.substr(0, 3);
        }
            console.log("nombre usuario",this.nombre)
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

        this.HomeProvider.inactivo(localStorage["id_empleado"])
        .then(data => {         
      console.log("inactivo",data);
        },err=>{
          let alert1 = this.AlertController.create({
            title: 'Error!',
            subTitle: 'No pudo conectar con el servidor!',
          buttons: ['OK']
          });
          alert1.present();
         
        })

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
     console.log("ionViewDidLoad()");
      this.usersprovider.user(localStorage["id_usuario"])
      .then(data => {
        console.log("data user act",datos = data);
        user = datos.user[0];
        console.log("token",localStorage["token"]= datos.token);
        if( user.nombre != null){
          console.log("nombre",localStorage["nombre"] = user.nombre);
        }
        if(user.email != null)console.log("email",localStorage["email"] = user.email);
        if(user.email != null)console.log("direccion",localStorage["direccion"] = user.direccion);
    
        if(user.cedula != null)console.log("cedula",localStorage["cedula"] = user.cedula);
        // if(user.monto != null){console.log("monto",localStorage["monto"] = user.monto);}
        if(user.id_usuario != null)console.log("id_usuario",localStorage["id_usuario"] = user.id_usuario);
        if(user.id_empresa != null)console.log("id_empresa",localStorage["id_empresa"] = user.id_empresa);
        if(user.id != null)console.log("id_empleado",localStorage["id_empleado"] = user.id);
        if(user.celular != null)console.log("celular",localStorage["celular"] = user.celular);
        if(user.fecha_nacimiento != null)console.log("fecha_nacimiento",localStorage["fecha_nacimiento"] = user.fecha_nacimiento);
        if(user.sexo != null)console.log("sexo",localStorage["sexo"] = user.sexo);
        if(user.ciudad != null)console.log("ciudad_empleado",localStorage["ciudad_empleado"] = datos.ciudad);
        if(user.bloqueo != null)console.log("bloqueo",localStorage["bloqueo"] = user.bloqueo);
    
      })
         //  this.nombre =this.user.nombre
         this.HomeProvider.getMonto(localStorage["id_empleado"])
        .then(data => {
          this.datos_monto = data;
          this.monto = this.datos_monto.data;
         
      console.log("monto  data",this.monto);
        },err=>{
          let alert1 = this.AlertController.create({
            title: 'Error!',
            subTitle: 'No pudo conectar con el servidor!',
          buttons: ['OK']
          });
          alert1.present();
         
        })
           this.nombre =localStorage["nombre"];
           this.email =localStorage["email"];
           this.cedula =localStorage["cedula"];
           this.celular =localStorage["celular"];
           this.direccion =localStorage["direccion"];
           this.ciudad_empleado =localStorage["ciudad_empleado"];
          //  this.monto =localStorage["monto"];
           this.id_empresa =localStorage["id_empresa"];
           this.id_usuario =localStorage["id_usuario"];
           this.id_empleado =localStorage["id_empleado"];
           this.fecha_nacimiento =localStorage["fecha_nacimiento"];
           this.sexo =localStorage["sexo"];
           this.bloqueo =localStorage["bloqueo"];
           var palabras = this.nombre,
           resultado= palabras.replace(/[A-Za-z]+/g, function(match){ return (match.trim()[0]);}); 
         
           console.log(resultado.replace(/\s/g, ''));
           if(resultado.length <= 2){
             this.letras = resultado;
           }else{
             this.letras = resultado.substr(0, 3);
           }
               console.log("nombre usuario",this.nombre)
         
       
    }
 }

  
}

