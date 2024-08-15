import { Injectable, Injector } from '@angular/core';
import { BaseDataListService } from 'src/app/abstracts/services/base-data-list.service';
import UserDto, { CreateRoleRequest, DataFilterRole, DeleteRoleRequest,  UpdateRoleRequest } from '../models/role.model';
import { NotificationService } from 'src/app/notification/notification.service';
import { ApiCommon } from '@pages/kios/common';
import { LIST_COLS } from '../pages/list/list-table.const';
import { BehaviorSubject, catchError, finalize, Observable, of, takeUntil } from 'rxjs';
import { DataListRequestPayload, FilterComparison } from '@models/base-data-list';
import { isNil } from 'ng-zorro-antd/core/util';
import { ResultModel } from '@models/base/data.interface';
import { RoleApi } from '../apis';

@Injectable({
  providedIn: 'root'
})
export class RoleService extends BaseDataListService<UserDto> {

  private subjectCreateUser = new BehaviorSubject<any>(null);
  createUse$: Observable<ResultModel<CreateRoleRequest>> = this.subjectCreateUser;

  public override getTableData(): void {
    this.getList();
  }

  constructor(injector: Injector,
  private _api: RoleApi,
  private _apiCommon: ApiCommon,
  private vcNotificationService: NotificationService) 
  { 
    super(injector);
    this.setDataItemCells(LIST_COLS);
  }

  override getPayload(): DataListRequestPayload {
    const search = {
      fieldName: 'name',
      comparison: FilterComparison.Contains,
      fieldValue: this.searchText
    };

    return {
      includes: [],
      filters: this.searchText ? [...this.filter, search] : this.filter,
      sorts: this.sorts,
      page: this.pageIndexNumber,
      pageSize: this.pageSizeNumber
    };
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
    getFillerRole(): Observable<ResultModel<DataFilterRole>> {
      return this._apiCommon.filterRole();   
    } 
    create(payload:CreateRoleRequest):void{
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
        this.subjectCreateUser.next(res);
        if (res?.isError) {
          //this.vcNotificationService.error('Error', res.errorMessage || '');
          return;
        }
        this.vcNotificationService.success(
          'Success',
          'Created role successfully!'
        );
      });
    }
    update(payload:UpdateRoleRequest):void{
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
        this.subjectCreateUser.next(res);
        if (res?.isError) {
          //this.vcNotificationService.error('Error', res.errorMessage || '');
          return;
        }
        this.vcNotificationService.success(
          'Success',
          'Update role successfully!'
        );
      });
    }
    
    delete(payload:DeleteRoleRequest):void{
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
        this.subjectCreateUser.next(res);
        if (res?.isError) {
          //this.vcNotificationService.error('Error', res.errorMessage || '');
          return;
        }
        this.vcNotificationService.success(
          'Success',
          'Delete role successfully!'
        );
      });
    }
}
