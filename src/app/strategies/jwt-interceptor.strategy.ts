import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { JwtInterceptorStrategy } from './jwt-interceptor-base.strategy';

@Injectable()
export class VcJwtInterceptorStrategy implements JwtInterceptorStrategy {
  publicAPIs: Array<string> = [];

  get accessToken(): string {
    //return this._auth.getAccessToken();
    return"";
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

  //constructor(private _auth: AuthService) {}

  handle(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (!this.isPublicApi(request.url) && this.isLogined) {
      const newRequest = this.setHttpHeader(request);
      return next.handle(newRequest);
    }
    return next.handle(request);
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
