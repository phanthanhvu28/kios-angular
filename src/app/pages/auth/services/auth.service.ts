import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { AuthApi } from '../api/auth.api';
import { AuthenUserDto, LoginUser, UserDto } from '../models';
import { catchError, of } from 'rxjs';
import { isNil } from 'ng-zorro-antd/core/util';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  _userAuthen:AuthenUserDto;
  _user:UserDto;
  constructor( 
    private router: Router,
    private authApi: AuthApi
  ) {}

  public logout = () => {
    localStorage.removeItem("t");
    const url = `/login`;
    this.router.navigate([url]);
  };

  public login (payload : LoginUser){       
      this.authApi.loginApi(payload)
      .pipe(
        catchError((error) => {
          console.log("error=>",error);
          return of(error);
        })
      ).subscribe((resp) => {
        console.log("loginResp=>",resp);
        if (isNil(resp)) {
          return;
        }
        if(resp.isError){
          return;
        }
        this._userAuthen = resp.data;
        const url = `../`;
        this.router.navigate([url]);
        localStorage.setItem("t",this._userAuthen.access_token);
        //this._user = this.getCurrentUserParse();
      });      
  }; 

  public isAuthenticated(): boolean{
    return !!this.accessToken;
  };
  get accessToken(): string {
    return localStorage.getItem("t");
  }
  public getCurrentUserParse(): UserDto {
    const token = this.accessToken;
    if (!token) {
      return null;
    }

    return this.parseJwt(token);
  }

  public getMenus(): any {
    const token = this.accessToken;
    if (!token) {
      return null;
    }
    const userToken = this.parseJwt(token);
    return JSON.parse(userToken.menus);
  }

  public hasPermission(siteCode:string, featureCode:string): boolean {
    const menus = this.getMenus();    
    if(menus != null){
      for (const menu of menus) {
        // Use `find` to directly locate the site with the matching siteCode
        const site = menu.Sites.find(site => site.SiteCode.toLowerCase() === siteCode.toLowerCase());  
        // If the site is found, check for the featureCode using `some`
        if (site) {
          return site.Feature.some(feature => feature.FeatureCode.toLowerCase() === featureCode.toLowerCase());
        }
      } 
    }
    return false;
  }

  parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    return JSON.parse(jsonPayload);
  }
}
