import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContextInterceptorStrategy } from '../context-interceptor.strategy';

@Injectable()
export class ContextInterceptor implements HttpInterceptor {

  constructor(private _strategy: ContextInterceptorStrategy) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this._strategy.handle(request,next);
  }
}
