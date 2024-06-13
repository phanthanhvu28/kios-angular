import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptorStrategy {
  handle(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        console.error(`Default Error Interceptor: `, error);
        return throwError(() => error);
      })
    );
  }
}
