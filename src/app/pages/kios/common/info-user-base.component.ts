import { Component } from "@angular/core";
import { AuthService } from "@pages/auth/services/auth.service";

@Component({  
   template: ''
  
  })
export class InfoUserBaseComponent{
   storeCode: string;
   companyCode:string;
   userName:string;
    constructor(private authenService: AuthService) 
    {
        this.storeCode = this.authenService.getCurrentUserParse().storecode;
        this.companyCode = this.authenService.getCurrentUserParse().companycode;
        this.userName = this.authenService.getCurrentUserParse().username;
        console.log("storeCode===",this.storeCode)
        console.log("companyCode===",this.companyCode)
        console.log("userName===",this.userName)
    }
}