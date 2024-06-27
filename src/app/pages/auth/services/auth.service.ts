import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { AuthApi } from '../api/auth.api';
import { LoginUser } from '../models';
import { catchError, of } from 'rxjs';
import { isNil } from 'ng-zorro-antd/core/util';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private router: Router,
    private authApi: AuthApi,
    injector: Injector
  ) {}

  public logout = () => {
    localStorage.removeItem("t");
    const url = `/login`;
    this.router.navigate([url]);
  };

  public login (payload : LoginUser) : void {    
      this.authApi.loginApi(payload)
      .pipe(
        catchError((error) => {
          console.log("error=>",error);
          return of(error);
        })
      ).subscribe((resp) => {
        console.log("resp=>",resp);
        if (isNil(resp)) {
          return;
        }
        // const url = `../`;
        // this.router.navigate([url]);
        // localStorage.setItem("t","");
      });
      // const url = `../`;
      // this.router.navigate([url]);
      // localStorage.setItem("t","");
     
  };

  public isAuthenticated(): boolean{
    return !!this.accessToken;
  };
  get accessToken(): string {
    return localStorage.getItem("t");
  }
}
