import { Injectable, Injector } from '@angular/core';
import { OrderApi } from '../apis';
import { BehaviorSubject, catchError, finalize, Observable, of, ReplaySubject, takeUntil } from 'rxjs';
import { isNil } from 'ng-zorro-antd/core/util';
import { OrderRequest } from '../models';
import { BaseDataListService } from 'src/app/abstracts/services/base-data-list.service';
import OrderDto, { OrderDetailDto } from '../models/order.model';
import { ResultModel } from '@models/base/data.interface';
import { NotificationService } from 'src/app/notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService{
  destroy$: ReplaySubject<boolean> = new ReplaySubject(1);
  private subjectCreateOrder = new BehaviorSubject<any>(null);
  createOrder$: Observable<ResultModel<OrderDto>> = this.subjectCreateOrder;

    constructor(injector: Injector,
                private _api: OrderApi,
                private vcNotificationService: NotificationService) 
    { 
    
    }

    create(payload:OrderRequest):void{
      //this.setLoading(true);
      this._api.create(payload)
      .pipe(
         takeUntil(this.destroy$),
        // finalize(() => this.setLoading(false)),
        catchError((err) => {
          return of(err);
        })
      )
      .subscribe((res) => {
        if (isNil(res)) {
          return;
        }
        this.subjectCreateOrder.next(res);
        if (res?.isError) {
          //this.vcNotificationService.error('Error', res.errorMessage || '');
          return;
        }
        this.vcNotificationService.success(
          'Success',
          'Created order successfully!'
        );
      });
    }
    getDetail(orderCode: string): Observable<ResultModel<OrderDetailDto>> {
      return this._api.detail(orderCode);      
    }

    protected destroy(): void {
      this.destroy$.next(true);
      this.destroy$.complete();
    }
}
