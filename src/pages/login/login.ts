import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, AlertController } from 'ionic-angular';
import { AppProvider } from '../../providers/app/app';
import { Subscription } from 'rxjs/Subscription';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public loginObj:any = {username:"",password:""};
  private loginResultSub:Subscription;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl:AlertController, private srv:AppProvider) {
  }

  ionViewDidLoad() {
   console.log('ionViewDidLoad LoginPage');
  // console.log(this.navParams.get('username'))
  }
  

  public onSubmitPressed(){
    console.log(this.loginObj);
    this.loginResultSub = this.srv.sendToServer('http://vasudevkumaran.com/ang/login',this.loginObj).subscribe(data=>{
        console.log(data)
        let status:string = data.result;
        if (status == 'OK'){
          this.srv.saveLogin(data.data[0]);
          this.navCtrl.pop()
        }else{
            let alert = this.alertCtrl.create({
              title:"Sorry",
              subTitle:"Username or password wrong",
              buttons:["Cancel"]
            })
            alert.present()
        }
    });
  }

}
