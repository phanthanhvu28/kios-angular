import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { JwtInterceptorStrategy } from './jwt-interceptor-base.strategy';
import { Router } from '@angular/router';

@Injectable()
export class VcJwtInterceptorStrategy implements JwtInterceptorStrategy {
  publicAPIs: Array<string> = [];

  get accessToken(): string {
    // return this._auth.getAccessToken();
    return localStorage.getItem("t");
  }

  get accessTokenType(): string {
    return 'Bearer';
  }

  get isLogined(): boolean {
    return !!this.accessToken;
  }

  get httpHeaderKey(): string {
    return 'Authorization';
  }

  constructor(private router: Router) {}

  handle(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const login = this.router.url.split('/')[1].toLowerCase();
    if(login == "login"){      
      return next.handle(request);
      //return throwError("");
    }
    else
    {
      if (!this.isPublicApi(request.url) && this.isLogined) {
        const newRequest = this.setHttpHeader(request);
        return next.handle(newRequest);
      }
      else
      {        
        this.router.navigate(['/login']);
        return throwError("");
      }
    }
  //return next.handle(request);
  }

  isPublicApi(url: string) {
    return this.publicAPIs.find((api) => api.indexOf(url) > -1);
  }

  setHttpHeader(req: HttpRequest<any>): HttpRequest<any> {
    const newReq = req.clone({
      setHeaders: {
        [`${this.httpHeaderKey}`]:
          `${this.accessTokenType} ${this.accessToken}`.trim()
      }
    });
    return newReq;
  }
}
