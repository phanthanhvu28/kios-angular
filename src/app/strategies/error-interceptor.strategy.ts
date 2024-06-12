import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NvMessageService } from '@common-components/base-modal-message/services/nv-message.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable, catchError, throwError } from 'rxjs';
//import { IS_QUOTATION_API } from './context-interceptor.strategy';

@Injectable()
export class VcErrorInterceptorStrategy {
  constructor(
    private modal: NzModalService,
    private _message: NvMessageService
  ) {}

  handle(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error) => {
        // if (request.context.get(IS_QUOTATION_API)) {
        //   return throwError(() => error?.error);
        // }

        console.log(error);
        if (error?.error) {
          const { isError, errorMessage } = error.error;
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

        if ([200, 204].includes(error.status)) return throwError(() => error);
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
