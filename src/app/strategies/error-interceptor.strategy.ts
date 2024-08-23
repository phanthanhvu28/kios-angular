import { HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NvMessageService } from '@common-components/base-modal-message/services/nv-message.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable, catchError, map, throwError } from 'rxjs';
import { ErrorInterceptorStrategy } from './error-interceptor-base.strategy';
import { AuthService } from '@pages/auth/services/auth.service';
import { Router } from '@angular/router';
//import { IS_QUOTATION_API } from './context-interceptor.strategy';

@Injectable()
export class VcErrorInterceptorStrategy implements ErrorInterceptorStrategy{
  constructor(
    private modal: NzModalService,
    private _message: NvMessageService,
    private authen: AuthService,
    private router: Router
  ) {}

  handle(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {    
    const url =request.url;    
    const controller = this.router.url.split('/').pop();
    const isAuthen = this.authen.hasPermission(controller,"View")
    const menus = this.authen.getMenus();
    if(!isAuthen && menus != null ){     
      this.router.navigate(['/403']);
      return throwError(() => null);
    }

    return next.handle(request).pipe(     
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // Log or process the response URL and data
          console.log('Response URL:', event.url);
          console.log('Response data:', event.body);
        }
        return event;
      }),
      catchError((error) => {       

        console.log("Erorro==>",error);
        if (error?.error) {
          const { isError, errorMessage } = error.error;
          console.log("Lỗi:",errorMessage);
          if (isError) {
            this._message.showErrorMessage({
              content: errorMessage
            });

            return throwError(() => error?.error);
          }
        }

        if (error.status === 400) {
          this._message.showErrorMessage({
            content: error?.error?.title
          });
          return throwError(() => null);
        }

        if ([200, 204].includes(error.status)){
          console.log("error200========>",error);
          return throwError(() => error);
        }
        if ([403].includes(error.status)) {
          this.warning403();
        } else if ([499].includes(error.status)) {
          this.warning499();
        } else {
          this.warningMessage(error);
        }
        return throwError(() => error);
      })
    );
  }

  warning403(): void {
    this.modal.warning({
      nzTitle: 'Access denied!',
      nzContent: "You don't have permission to access this resource.",
      nzWidth: 500
    });
  }

  warning499(): void {
    this.modal.warning({
      nzTitle: 'Timeout!',
      nzContent: 'Request has timed out, please reload the page.',
      nzWidth: 500
    });
  }

  warningMessage(error: any): void {
    let errorTitle = 'Error!';
    let errorMessage = 'Some error occurred.';

    if (error.status && error.name && error.message) {
      errorTitle = error.status + ' ' + error.name;
      errorMessage = error.message;
    }
    this.modal.warning({
      nzTitle: errorTitle,
      nzContent: errorMessage,
      nzWidth: 500
    });
    console.log(error);
  }
}
