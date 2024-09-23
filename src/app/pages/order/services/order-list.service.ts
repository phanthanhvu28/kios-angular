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

  private subjectTotalOrder = new BehaviorSubject<number>(0);
  totalOrder$: Observable<number> = this.subjectTotalOrder;

  protected orderCode: string = '';

  public setOrderCode(code: string): void {
    this.orderCode = code;
  }

 getTableData(): void {
    if(isNil(this.orderCode) || this.orderCode.length === 0)
    {     
      this.setDataItems([]); 
      this.subjectTotalOrder.next(0);
      return;
    }
    this.getList(this.orderCode)
    .pipe(
      takeUntil(this.destroy$),
      finalize(() => this.setLoading(false))
    )
    .subscribe((res) => {
      this.setDataItems(res.data.items);   
      this.subjectTotalOrder.next(res.data.order.totalCost);
    });
  }

  getList(orderCode : string): Observable<ResultModel<OrderDetailDto>> {
    this.setLoading(true);
    return this._api.detail(orderCode);      
  }

  constructor(injector: Injector,
    private _api: OrderApi
  ) {
    super(injector);
    this.setDataItemCells(LIST_COLS);
  }
}
