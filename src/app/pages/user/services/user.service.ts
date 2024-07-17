import { Injectable, Injector } from '@angular/core';
import { BaseDataListService } from 'src/app/abstracts/services/base-data-list.service';
import UserDto, { CreateUserRequest, DataFilterUser, DeleteUserRequest } from '../models/user.model';
import { NotificationService } from 'src/app/notification/notification.service';
import { UserApi } from '../apis';
import { ApiCommon } from '@pages/kios/common';
import { LIST_COLS } from '../pages/list/list-table.const';
import { BehaviorSubject, catchError, finalize, Observable, of, takeUntil } from 'rxjs';
import { DataListRequestPayload, FilterComparison } from '@models/base-data-list';
import { isNil } from 'ng-zorro-antd/core/util';
import { ResultModel } from '@models/base/data.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseDataListService<UserDto> {

  private subjectCreateUser = new BehaviorSubject<any>(null);
  createUse$: Observable<ResultModel<CreateUserRequest>> = this.subjectCreateUser;

  public override getTableData(): void {
    this.getList();
  }

  constructor(injector: Injector,
  private _api: UserApi,
  private _apiCommon: ApiCommon,
  private vcNotificationService: NotificationService) 
  { 
    super(injector);
    this.setDataItemCells(LIST_COLS);
  }

  override getPayload(): DataListRequestPayload {
    const search = {
      fieldName: 'username',
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
    getFillerUser(): Observable<ResultModel<DataFilterUser>> {
      return this._apiCommon.filterUser();   
    } 
    create(payload:CreateUserRequest):void{
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
          'Created user successfully!'
        );
      });
    }
    delete(payload:DeleteUserRequest):void{
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
          'Delete user successfully!'
        );
      });
    }
}
