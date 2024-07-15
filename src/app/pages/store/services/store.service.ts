import { Injectable, Injector } from '@angular/core';
import { BaseDataListService } from 'src/app/abstracts/services/base-data-list.service';
import StoreDto, { DataFilterStore, DeleteStoreRequest, StoreRequest } from '../models/store.model';
import { StoreApi } from '../apis';
import { LIST_COLS } from '../pages/list/list-table.const';
import { BehaviorSubject, catchError, finalize, Observable, of, takeUntil, throwError } from 'rxjs';
import { ApiCommon } from '@pages/kios/common';
import { ResultDataResponse, ResultModel } from '@models/base/data.interface';
import { isNil } from 'ng-zorro-antd/core/util';
import { NotificationService } from 'src/app/notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService extends BaseDataListService<StoreDto> {

  private subjectCreateStore = new BehaviorSubject<any>(null);
  createStore$: Observable<ResultModel<StoreDto>> = this.subjectCreateStore;

  constructor(injector: Injector,
    private _api: StoreApi,
    private _apiCommon: ApiCommon,
    private vcNotificationService: NotificationService,
  ) {
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
  getFillerCompany(): Observable<ResultModel<DataFilterStore>> {
    return this._apiCommon.filterCompany();   
  }
  create(payload:StoreRequest):void{
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
        'Created store successfully!'
      );
    });
  }

  update(payload:StoreRequest):void{
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
        'Update store successfully!'
      );
    });
  }
  delete(payload:DeleteStoreRequest):void{
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
        'Delete store successfully!'
      );
    });
  }
}
