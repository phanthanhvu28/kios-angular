import { Injectable, Injector } from '@angular/core';
import { BaseDataListService } from 'src/app/abstracts/services/base-data-list.service';
import { BaseCompanyService } from './base-company.service';
import { ApiCompany } from '../apis';
import { COMPANY_LIST_COLS } from '../pages/list/company-list-table.const';
import { BehaviorSubject, MonoTypeOperatorFunction, Observable, catchError, finalize, of, takeUntil } from 'rxjs';
import CompanyRequest from '../models/company.model';
import { isNil } from 'ng-zorro-antd/core/util';
import { NotificationService } from 'src/app/notification/notification.service';
import { ResultDataResponse } from '@models/base/data.interface';
import CompanyDto from '../models/company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService extends BaseDataListService<CompanyDto> {
  
  private subjectCreateCompany = new BehaviorSubject<any>(null);
  createCompany$: Observable<ResultDataResponse> = this.subjectCreateCompany;
  constructor(
    injector: Injector,
    private _api: ApiCompany,
    private vcNotificationService: NotificationService,
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
  create(payload:CompanyRequest):void{
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
      this.subjectCreateCompany.next(res);
      if (res?.isError) {
        //this.vcNotificationService.error('Error', res.errorMessage || '');
        return;
      }
      this.vcNotificationService.success(
        'Success',
        'Created contract successfully!'
      );
      this.router.navigate(['contract/customer/contract', res.data.code]);
    });
  }
}
