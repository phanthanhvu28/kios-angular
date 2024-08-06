import { Injectable, Injector } from '@angular/core';
import { BaseDataListService } from 'src/app/abstracts/services/base-data-list.service';
import AreaDto, { AreaRequest, DataFilterArea, DeleteAreaRequest } from '../models/area.model';
import { BehaviorSubject, catchError, finalize, Observable, of, takeUntil } from 'rxjs';
import { ResultModel } from '@models/base/data.interface';
import { AreaApi } from '../apis';
import { ApiCommon } from '@pages/kios/common';
import { NotificationService } from 'src/app/notification/notification.service';
import { LIST_COLS } from '../pages/list/list-table.const';
import { isNil } from 'ng-zorro-antd/core/util';

@Injectable({
  providedIn: 'root'
})
export class AreaService extends BaseDataListService<AreaDto>{
  private subjectCreateArea = new BehaviorSubject<any>(null);
  createArea$: Observable<ResultModel<AreaDto>> = this.subjectCreateArea;

  constructor(injector: Injector,
    private _api: AreaApi,
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
  getFillerStaff(): Observable<ResultModel<DataFilterArea>> {
    return this._apiCommon.filterStaff();   
  }
  create(payload:AreaRequest):void{
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
      this.subjectCreateArea.next(res);
      if (res?.isError) {
        //this.vcNotificationService.error('Error', res.errorMessage || '');
        return;
      }
      this.vcNotificationService.success(
        'Success',
        'Created area successfully!'
      );
    });
  }
  update(payload:AreaRequest):void{
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
      this.subjectCreateArea.next(res);
      if (res?.isError) {
        //this.vcNotificationService.error('Error', res.errorMessage || '');
        return;
      }
      this.vcNotificationService.success(
        'Success',
        'Update area successfully!'
      );
    });
  }
  delete(payload:DeleteAreaRequest):void{
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
      this.subjectCreateArea.next(res);
      if (res?.isError) {
        //this.vcNotificationService.error('Error', res.errorMessage || '');
        return;
      }
      this.vcNotificationService.success(
        'Success',
        'Delete area successfully!'
      );
    });
  }
}
