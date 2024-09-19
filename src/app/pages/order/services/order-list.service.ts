import { Injectable, Injector } from '@angular/core';
import { OrderApi } from '../apis';
import { BehaviorSubject, catchError, finalize, Observable, of, ReplaySubject, takeUntil } from 'rxjs';
import { isNil } from 'ng-zorro-antd/core/util';
import { OrderRequest } from '../models';
import { BaseDataListService } from 'src/app/abstracts/services/base-data-list.service';
import OrderDto, { OrderDetailDto } from '../models/order.model';
import { ResultModel } from '@models/base/data.interface';
import { NotificationService } from 'src/app/notification/notification.service';
import ProductDto from '@pages/product/models/product.model';
import { LIST_COLS } from '../pages/components/table-order-list/table-order-list.const';

@Injectable({
  providedIn: 'root'
})
export class OrderListService extends BaseDataListService<OrderDetailDto>{

  protected orderCode: string = '';

  public setOrderCode(code: string): void {
    this.orderCode = code;
  }

  public override getTableData(): void {
   this.getList(this.orderCode)
   .pipe(
    takeUntil(this.destroy$),
    finalize(() => this.setLoading(false))
  )
  .subscribe((res) => {
    this.setDataItems(res.data.items);
    this.setTotalItem(10);
  });
  }

  getList(orderCode : string): Observable<ResultModel<OrderDetailDto>> {
    this.setLoading(true);
    return this._api.detail(orderCode);      
  }

  constructor(injector: Injector,
    private _api: OrderApi,
    private vcNotificationService: NotificationService,
  ) {
    super(injector);
    this.setDataItemCells(LIST_COLS);
  }
  
}
