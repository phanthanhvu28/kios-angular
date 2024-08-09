import { Injectable, Injector } from '@angular/core';
import { BaseDataListService } from 'src/app/abstracts/services/base-data-list.service';
import TypeSaleBaseDto, { DataFilterTypeSale, DeleteTypeSaleRequest, TypeSaleRequest } from '../models/type-sale.model';
import { ResultModel } from '@models/base/data.interface';
import { BehaviorSubject, catchError, finalize, Observable, of, takeUntil } from 'rxjs';
import { ApiCommon } from '@pages/kios/common';
import { NotificationService } from 'src/app/notification/notification.service';
import { TypeSaleApi } from '../apis';
import { LIST_COLS } from '../pages/list/list-table.const';
import { isNil } from 'ng-zorro-antd/core/util';

@Injectable({
  providedIn: 'root'
})
export class TypeSaleService extends BaseDataListService<TypeSaleBaseDto>{
  private subjectBehavior = new BehaviorSubject<any>(null);
  entityObservable$: Observable<ResultModel<TypeSaleBaseDto>> = this.subjectBehavior;
  
  constructor(injector: Injector,
    private _api: TypeSaleApi,
    private _apiCommon: ApiCommon,
    private vcNotificationService: NotificationService) { 
      super(injector);
      this.setDataItemCells(LIST_COLS);
    }

  public override getTableData(): void {
    this.getList();
  }
  getList(): void {
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
  getFillerTypeSale(): Observable<ResultModel<DataFilterTypeSale>> {
    return this._apiCommon.filterTypeSale();   
  }
  create(payload:TypeSaleRequest):void{
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
      this.subjectBehavior.next(res);
      if (res?.isError) {
        //this.vcNotificationService.error('Error', res.errorMessage || '');
        return;
      }
      this.vcNotificationService.success(
        'Success',
        'Created type sale successfully!'
      );
    });
  }
  update(payload:TypeSaleRequest):void{
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
      this.subjectBehavior.next(res);
      if (res?.isError) {
        //this.vcNotificationService.error('Error', res.errorMessage || '');
        return;
      }
      this.vcNotificationService.success(
        'Success',
        'Update type sale successfully!'
      );
    });
  }
  delete(payload:DeleteTypeSaleRequest):void{
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
      this.subjectBehavior.next(res);
      if (res?.isError) {
        //this.vcNotificationService.error('Error', res.errorMessage || '');
        return;
      }
      this.vcNotificationService.success(
        'Success',
        'Delete type sale successfully!'
      );
    });
  }

}
