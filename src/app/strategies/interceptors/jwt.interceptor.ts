import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtInterceptorStrategy } from '../jwt-interceptor-base.strategy';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private _strategy: JwtInterceptorStrategy) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this._strategy.handle(request, next);
  }
}
