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
  private pageTitle:string = "Register"
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
    if (this.navParams.get('type') == "Edit"){
        this.pageTitle = "Profile"
        var reg:any = this.srv.getLogin();
        if (reg.is_business == "1"){
          reg.is_business = true;
        }else{
          reg.is_business = false;
        }
        if (reg.is_holidays){
          reg.is_holidays = true;
        }else{
          reg.is_holidays = false;
        }
        if (reg.is_travel){
          reg.is_travel = true;
        }else{
          reg.is_travel = false;
        }

        this.regObj = reg;
    }
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
    var url = "http://vasudevkumaran.com/ang/registration";
    if (this.pageTitle == 'Profile'){
      url = "http://vasudevkumaran.com/ang/registrationupdate"
    }
    this.srv.sendToServer(url,reg).subscribe(data => {
        console.log(data)
        this.navCtrl.pop()
    })
  }

}
