import {
    HttpContext,
    HttpContextToken,
    HttpEvent,
    HttpHandler,
    HttpRequest
  } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { Observable, map } from 'rxjs';
  
  export const IS_UNKNOWN_API = new HttpContextToken<boolean>(() => false);
  
  @Injectable()
  export class ContextInterceptorStrategy {
    handle(
      request: HttpRequest<unknown>,
      next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
      const newRequest = this.setApiContext(request, IS_UNKNOWN_API);
      return next.handle(newRequest);
    }
  
    setApiContext(req: HttpRequest<unknown>, token: HttpContextToken<boolean>) {
      const newReq = req.clone({
        context: new HttpContext().set(token, true)
      });
      return newReq;
    }
  }
  