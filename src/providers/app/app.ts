import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the AppProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AppProvider {

  constructor(public http: HttpClient) {
    console.log('Hello AppProvider Provider');
  }

  public sendToServer(url: string, payload: any): Observable<any> {
    var headerParams: HttpHeaders = new HttpHeaders();
    headerParams.append('Content-Type', 'application/json');
    return this.http.post(url, payload, { headers: headerParams })

  }

  public saveLogin(loginObj:any){
    console.log(loginObj)
      localStorage.setItem("user_full_name",loginObj.user_full_name);
      localStorage.setItem("user_last_name",loginObj.user_last_name)
      localStorage.setItem("user_gender",loginObj.user_gender)
      localStorage.setItem("is_business",loginObj.is_business)
      localStorage.setItem("is_holidays",loginObj.is_holidays)
      localStorage.setItem("is_travel",loginObj.is_travel)
      localStorage.setItem("user_id",loginObj.user_id)
      localStorage.setItem("user_name",loginObj.user_name)
      localStorage.setItem("user_password",loginObj.user_password)

  }

  public setLogout(){
      localStorage.removeItem("user_full_name");
      localStorage.removeItem("user_last_name")
      localStorage.removeItem("user_gender")
      localStorage.removeItem("is_business")
      localStorage.removeItem("is_holidays")
      localStorage.removeItem("is_travel")
      localStorage.removeItem("user_id")
      localStorage.removeItem("user_name")
      localStorage.removeItem("user_password")
  }

  public getLogin(){
    
    if (localStorage.getItem("user_id")){
        return {username:localStorage.getItem("user_name"),
        password:localStorage.getItem("user_password"),
        firstname:localStorage.getItem("user_full_name"),
        lastname:localStorage.getItem("user_last_name"),
        gender:localStorage.getItem("user_gender"),
        is_business:localStorage.getItem("is_business"),
        is_travel:localStorage.getItem("is_travel"),
        is_holidays:localStorage.getItem("is_holidays"),
      }
    }else{
       return {username:null,password:null,user_id:"-1"}
    }
  }

}
