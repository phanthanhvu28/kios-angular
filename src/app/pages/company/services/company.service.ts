import { Injectable, Injector } from '@angular/core';
import { BaseDataListService } from 'src/app/abstracts/services/base-data-list.service';
import { BaseCompanyService } from './base-company.service';
import { ApiList } from '../apis';
import { COMPANY_LIST_COLS } from '../pages/list/company-list-table.const';
import { finalize, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService extends BaseCompanyService<any> {
  constructor(
    injector: Injector,
    private _api: ApiList,
    //private vcNotificationService: VcNotificationService,
   // authService: AuthService
  ) {
    super(injector);
    this.setDataItemCells(COMPANY_LIST_COLS);
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
}
