import { Injectable, Injector } from '@angular/core';
import { BaseDataListService } from 'src/app/abstracts/services/base-data-list.service';
import StaffDto, { DataFilterStaff, DeleteStaffRequest, StaffRequest } from '../models/staff.model';
import { StaffApi } from '../apis';
import { ApiCommon } from '@pages/kios/common';
import { NotificationService } from 'src/app/notification/notification.service';
import { LIST_COLS } from '../pages/list/list-table.const';
import { BehaviorSubject, catchError, finalize, Observable, of, takeUntil } from 'rxjs';
import { ResultModel } from '@models/base/data.interface';
import { isNil } from 'ng-zorro-antd/core/util';

@Injectable({
  providedIn: 'root'
})
export class StaffService extends BaseDataListService<StaffDto> {

  private subjectCreateStaff = new BehaviorSubject<any>(null);
  createStaff$: Observable<ResultModel<StaffDto>> = this.subjectCreateStaff;

  constructor(injector: Injector,
    private _api: StaffApi,
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
    getFillerStaff(): Observable<ResultModel<DataFilterStaff>> {
      return this._apiCommon.filterStaff();   
    }
    create(payload:StaffRequest):void{
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
        this.subjectCreateStaff.next(res);
        if (res?.isError) {
          //this.vcNotificationService.error('Error', res.errorMessage || '');
          return;
        }
        this.vcNotificationService.success(
          'Success',
          'Created staff successfully!'
        );
      });
    }
    update(payload:StaffRequest):void{
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
        this.subjectCreateStaff.next(res);
        if (res?.isError) {
          //this.vcNotificationService.error('Error', res.errorMessage || '');
          return;
        }
        this.vcNotificationService.success(
          'Success',
          'Update staff successfully!'
        );
      });
    }
    delete(payload:DeleteStaffRequest):void{
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
        this.subjectCreateStaff.next(res);
        if (res?.isError) {
          //this.vcNotificationService.error('Error', res.errorMessage || '');
          return;
        }
        this.vcNotificationService.success(
          'Success',
          'Delete staff successfully!'
        );
      });
    }
}
