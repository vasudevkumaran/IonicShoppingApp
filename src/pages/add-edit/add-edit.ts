import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppProvider } from '../../providers/app/app';

/**
 * Generated class for the AddEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-edit',
  templateUrl: 'add-edit.html',
})
export class AddEditPage {

  public pageTitle:string = "Add Item"
  public item:any = {itemname:"",itemqty:"",itemprice:""}
  public message:string = "";
  constructor(public navCtrl: NavController, public navParams: NavParams,private srv:AppProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEditPage');
    if (this.navParams.get('type') == "Edit"){
      let itemObj = this.navParams.get('obj');
      console.log(itemObj)
      this.item.itemid = itemObj.item_id
      this.item.itemname = itemObj.item_name
      this.item.itemprice = itemObj.item_price
      this.item.itemqty = itemObj.item_qty;
      this.pageTitle = "Edit"
    }
  }

  public onSavePressed(){

    let loginObj = this.srv.getLogin();
    this.item.username = loginObj.username
    this.item.password = loginObj.password
    var url = "http://vasudevkumaran.com/ang/additem";
    if (this.pageTitle == "Edit"){
      url = "http://vasudevkumaran.com/ang/updateitem";
    }
    this.srv.sendToServer(url,this.item).subscribe(data=>{
      console.log(data)
      if (data.result == 'OK'){
        this.message = data.message;
        this.navCtrl.pop()
      }else{
        this.message = data.message;
      }
    })
  }

}
