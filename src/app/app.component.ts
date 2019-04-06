
import { Component } from '@angular/core';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

import { Platform, MenuController, Nav, AlertController } from 'ionic-angular';


import { HomePage } from '../pages/home/home';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

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
      { title: 'Instalaciones',icon:'logo-codepen', component: HomePage , logout : false },
      { title: 'Zona-Socios',icon:'md-cog', component: HomePage , logout : false },
      { title: 'Paga en Linea',icon:'md-card', component: HomePage , logout : false },
      { title: 'Pqrs',icon:'md-mail', component: HomePage , logout : false },
      { title: 'Logout',icon:'md-log-out', component: HomePage , logout : true }
  
    ];
    this.logeado = true;

  }

  
}

