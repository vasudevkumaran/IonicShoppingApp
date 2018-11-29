import { Component } from '@angular/core';
import {  ModalController } from 'ionic-angular';
import { AppProvider } from '../../providers/app/app';
import { LoginPage } from '../login/login';
import { MainPage } from '../main/main';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage  {
  

  
  constructor(public modalCtrl: ModalController,private srv:AppProvider) {

  }

  public ionViewDidLoad() {
      console.log(this.srv.getLogin());
      let loginObj = this.srv.getLogin();
      if (loginObj.user_id == "-1"){
        //launch login screen
        let loginMod = this.modalCtrl.create(LoginPage)
        loginMod.onDidDismiss( data =>{
          let mainMod = this.modalCtrl.create(MainPage)
          mainMod.present()
        })
        loginMod.present()
      }else{
        //already logged in, launch Main Screen
        let mainMod = this.modalCtrl.create(MainPage)
        mainMod.present()
      }
  }

}
