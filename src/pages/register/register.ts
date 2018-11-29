import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppProvider } from '../../providers/app/app';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  public regObj:any = {username:"",
                        password:"",
                        firstname:"",
                        lastname:"",
                        gender:"2",
                        is_business:false,
                        is_travel:false,
                        is_holidays:false};

  constructor(public navCtrl: NavController, public navParams: NavParams,private srv:AppProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  public backBtnPressed(){
    this.navCtrl.pop();
  }

  public onSubmitPressed(){
    //console.log(this.regObj)
    var reg = JSON.parse(JSON.stringify(this.regObj)); // to create non bindable object
    if (this.regObj.is_business){
      reg.is_business = "1";
    }else{
      reg.is_business = "2";
    }
    if (this.regObj.is_holidays){
      reg.is_holidays = "1";
    }else{
      reg.is_holidays = "2";
    }
    if (this.regObj.is_travel){
      reg.is_travel = "1";
    }else{
      reg.is_travel = "2";
    }
    console.log(reg);
    this.srv.sendToServer('http://vasudevkumaran.com/ang/registration',reg).subscribe(data => {
        console.log(data)
    })
  }

}
