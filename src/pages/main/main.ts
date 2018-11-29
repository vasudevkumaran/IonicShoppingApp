import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController } from 'ionic-angular';
import { AppProvider } from '../../providers/app/app';
import { AddEditPage } from '../add-edit/add-edit';
import { RegisterPage } from '../register/register';

/**
 * Generated class for the MainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {
  public items = [];
  public listVisible = true;
  constructor(public navCtrl: NavController, public navParams: NavParams,private actionSheetCtrl:ActionSheetController,private alertCtrl:AlertController,private srv:AppProvider) {
  }

  ionViewDidLoad() {
    
  }
  ionViewWillEnter(){
    console.log("view is active")
    this.reloadItems();
  }

  public reloadItems(){
    console.log(this.srv.getLogin());

    this.srv.sendToServer('http://vasudevkumaran.com/ang/getallitems',this.srv.getLogin()).subscribe(data=>{
      console.log(data)
      this.items = data.items
    });
  }
  public goBack(){
    this.navCtrl.pop()
  }

  public toggleNgIf(){
    if (this.listVisible){
      this.listVisible = false;
    }else{
      this.listVisible = true;
    }
  }

  public onEditItemPressed(item){
      this.navCtrl.push(AddEditPage,{type:"Edit",obj:item})
  }

  public onDeleteItemPressed(item){
    let alert = this.alertCtrl.create({
      title:"Wait",
      message:"Item once deleted, Can not be restored",
      buttons:[
        {
          text:"Delete",
          handler:()=>{
            let loginObj = this.srv.getLogin();
            var itemObj:any = {};
            itemObj.username = loginObj.username
            itemObj.password = loginObj.password
            itemObj.itemid = item.item_id
            console.log(itemObj)
            
            this.srv.sendToServer('http://vasudevkumaran.com/ang/deleteitem',itemObj).subscribe(data=>{
              console.log(data)
              this.reloadItems();
            })
            
          }
        },
        {
          text:"Cancel",
          handler:()=>{

          }
        }]
    });
    alert.present()
  }

  public showMenu(){
    let actionSheet = this.actionSheetCtrl.create({
      title:"Menu",
      buttons:[
        {
          text:"Add Item",
          handler: ()=>{
            console.log("Add item Pressed")
            let add = this.navCtrl.push(AddEditPage,{type:"Add"})
            
          }
        },
        {
          text:"Profile",
          handler: ()=>{
            console.log("Profile Pressed")
            this.navCtrl.push(RegisterPage,{type:"Edit"})
          }
        },
        {
          text:"Logout",
          role:"destructive",
          handler: ()=>{
            console.log("Add item Pressed")
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present()
  }
}
