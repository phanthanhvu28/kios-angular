import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptorStrategy {
  publicAPIs: Array<string> = [];

  get accessToken(): string {
    return localStorage.getItem('t');
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
