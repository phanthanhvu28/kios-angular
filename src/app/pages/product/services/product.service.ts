import { Injectable, Injector } from '@angular/core';
import { BaseDataListService } from 'src/app/abstracts/services/base-data-list.service';
import ProductDto, { DataFilterProduct, DeleteProductRequest, ProductRequest } from '../models/product.model';
import { LIST_COLS } from '../pages/list/list-table.const';
import { BehaviorSubject, catchError, finalize, Observable, of, takeUntil, throwError } from 'rxjs';
import { ApiCommon } from '@pages/kios/common';
import { ResultDataResponse, ResultListModel, ResultModel } from '@models/base/data.interface';
import { isNil } from 'ng-zorro-antd/core/util';
import { NotificationService } from 'src/app/notification/notification.service';
import { ProductApi } from '../apis';
import { DataListRequestPayload } from '@models/base-data-list';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseDataListService<ProductDto> {

  private subjectCreateStore = new BehaviorSubject<any>(null);
  createStore$: Observable<ResultModel<ProductDto>> = this.subjectCreateStore;

  constructor(injector: Injector,
    private _api: ProductApi,
    private _apiCommon: ApiCommon,
    private vcNotificationService: NotificationService,
  ) {
    super(injector);
    this.setDataItemCells(LIST_COLS);
  }
  public override getTableData(): void { 
    
    this.setLoading(true);
    const payload = this.getPayload();
    payload.filters = [...payload.filters];

    this.getList(payload).pipe(
      takeUntil(this.destroy$),
      finalize(() => this.setLoading(false))
    )
    .subscribe((res) => {
      this.setDataItems(res.items);
      this.setTotalItem(res.totalItems);
    });;
  } 
  getListBK(): void {
    this.setLoading(true);
    const payload = this.getPayload();
    payload.filters = [...payload.filters];
    this._api
      .getAll(payload)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.setLoading(false))
      )
      .subscribe((res) => {
        this.setDataItems(res.items);
        this.setTotalItem(res.totalItems);
      });
  }
  getList(payload : DataListRequestPayload): Observable<ResultListModel<ProductDto>> {
    this.setLoading(true);
    //const payload = this.getPayload();
    payload.filters = [...payload.filters];
    return this._api.getAll(payload);      
  }

  getFillerProduct(): Observable<ResultModel<DataFilterProduct>> {
    return this._apiCommon.filterProduct();   
  }
  create(payload:ProductRequest):void{
    this.setLoading(true);
    this._api.create(payload)
    .pipe(
      takeUntil(this.destroy$),
      finalize(() => this.setLoading(false)),
      catchError((err) => {
        return of(err);
      })
    )
    .subscribe((res) => {
      if (isNil(res)) {
        return;
      }
      this.subjectCreateStore.next(res);
      if (res?.isError) {
        //this.vcNotificationService.error('Error', res.errorMessage || '');
        return;
      }
      this.vcNotificationService.success(
        'Success',
        'Created product successfully!'
      );
    });
  }

  update(payload:ProductRequest):void{
    this.setLoading(true);
    this._api.update(payload)
    .pipe(
      takeUntil(this.destroy$),
      finalize(() => this.setLoading(false)),
      catchError((err) => {
        return of(err);
      })
    )
    .subscribe((res) => {
      if (isNil(res)) {
        return;
      }
      this.subjectCreateStore.next(res);
      if (res?.isError) {
        //this.vcNotificationService.error('Error', res.errorMessage || '');
        return;
      }
      this.vcNotificationService.success(
        'Success',
        'Update product successfully!'
      );
    });
  }
  delete(payload:DeleteProductRequest):void{
    this.setLoading(true);
    this._api.delete(payload)
    .pipe(
      takeUntil(this.destroy$),
      finalize(() => this.setLoading(false)),
      catchError((err) => {
        return of(err);
      })
    )
    .subscribe((res) => {
      if (isNil(res)) {
        return;
      }
      this.subjectCreateStore.next(res);
      if (res?.isError) {
        //this.vcNotificationService.error('Error', res.errorMessage || '');
        return;
      }
      this.vcNotificationService.success(
        'Success',
        'Delete product successfully!'
      );
    });
  }
}
