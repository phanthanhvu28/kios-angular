import { Injectable, Injector } from '@angular/core';
import { BaseDataListService } from 'src/app/abstracts/services/base-data-list.service';
import { BaseCompanyService } from './base-company.service';
import { ApiList } from '../apis';
import { COMPANY_LIST_COLS } from '../pages/list/company-list-table.const';

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
    throw new Error('Method not implemented.');
  }  
}
