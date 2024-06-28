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
        // const url = `../`;
        // this.router.navigate([url]);
        // localStorage.setItem("t","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRyZXNzIjoiQsOsbmggxJDhu4tuaCIsInBob25lIjoiMDkzODk4MzY4OSIsImVtYWlsIjoiZGlldGVyLnZ1QHZlbGEuY29tLnZuIiwidXNlcm5hbWUiOiJkaWV0ZXIudnUiLCJmdWxsbmFtZSI6IlBoYW4gVGhhbmggVsWpIiwicm9sZSI6ImFkbWluIiwiZXhwIjoxNzE5NDgyNDI4LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjYwMDEvIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo2MDAxLyJ9.Kxy2Iapr69NK2IcSgicvAk2pG5Rm1mIdyKDkLCzD6wA");
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
