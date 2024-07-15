import { Injectable, Injector } from '@angular/core';
import { BaseDataListService } from 'src/app/abstracts/services/base-data-list.service';
import UserDto from '../models/user.model';
import { NotificationService } from 'src/app/notification/notification.service';
import { UserApi } from '../apis';
import { ApiCommon } from '@pages/kios/common';
import { LIST_COLS } from '../pages/list/list-table.const';
import { finalize, takeUntil } from 'rxjs';
import { DataListRequestPayload, FilterComparison } from '@models/base-data-list';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseDataListService<UserDto> {
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
      fieldName: 'userName',
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
}
