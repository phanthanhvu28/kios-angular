import { Injectable, Injector } from '@angular/core';
import TableBaseDto, { DataFilterTable, DeleteTableRequest, TableRequest } from '../models/table.model';
import { BaseDataListService } from 'src/app/abstracts/services/base-data-list.service';
import { ApiCommon } from '@pages/kios/common';
import { NotificationService } from 'src/app/notification/notification.service';
import { TableApi } from '../apis';
import { LIST_COLS } from '../pages/list/list-table.const';
import { BehaviorSubject, catchError, finalize, Observable, of, takeUntil, throwError } from 'rxjs';
import { ResultModel } from '@models/base/data.interface';
import { isNil } from 'ng-zorro-antd/core/util';

@Injectable({
  providedIn: 'root'
})
export class TableService extends BaseDataListService<TableBaseDto>{

  private subjectBehavior = new BehaviorSubject<any>(null);
  entityObservable$: Observable<ResultModel<TableBaseDto>> = this.subjectBehavior;


  private subjectListTableByStoreBehavior = new BehaviorSubject<any>(null);
  tableByStoreObservable$: Observable<ResultModel<TableBaseDto[]>> = this.subjectListTableByStoreBehavior;
  
  constructor(injector: Injector,
    private _api: TableApi,
    private _apiCommon: ApiCommon,
    private vcNotificationService: NotificationService) { 
      super(injector);
      this.setDataItemCells(LIST_COLS);
    }

  public override getTableData(): void {
    this.getList()
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
  getFillerStaff(): Observable<ResultModel<DataFilterTable>> {
    return this._apiCommon.filterTable();   
  }
  create(payload:TableRequest):void{
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
        'Created table successfully!'
      );
    });
  }
  update(payload:TableRequest):void{
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
        'Update table successfully!'
      );
    });
  }
  delete(payload:DeleteTableRequest):void{
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
        'Delete table successfully!'
      );
    });
  }
  getTableByStore(id: string): void {
    this._api
      .getTableByStore(id)
      .pipe(    
        takeUntil(this.destroy$)
      )
      .subscribe((res) => {
        if (isNil(res)) {
          return;
        }
        this.subjectListTableByStoreBehavior.next(res);
      });
  }
}
