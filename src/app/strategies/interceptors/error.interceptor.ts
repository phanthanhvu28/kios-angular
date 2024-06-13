import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ErrorInterceptorStrategy } from '../error-interceptor-base.strategy';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private _strategy: ErrorInterceptorStrategy) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this._strategy.handle(request, next);
  }
}
