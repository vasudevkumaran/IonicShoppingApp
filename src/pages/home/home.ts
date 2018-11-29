import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { AppProvider } from '../../providers/app/app';
import { LoginPage } from '../login/login';
import { MainPage } from '../main/main';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private loginMod;
  private mainMod;


  constructor(public modalCtrl: ModalController, private srv: AppProvider) {

  }

  public ionViewDidLoad() {
    this.mainMod = this.modalCtrl.create(MainPage)
    this.mainMod.onDidDismiss(_ => {
      this.loginMod.present()
    })

    this.loginMod = this.modalCtrl.create(LoginPage)
    this.loginMod.onDidDismiss(data => {
      this.mainMod.present()
    })
    console.log(this.srv.getLogin());
    let loginObj = this.srv.getLogin();
    if (loginObj.user_id == "-1") {
      //launch login screen
      this.loginMod.present()
    } else {
      //already logged in, launch Main Screen
      this.mainMod.present()
    }
  }

}
