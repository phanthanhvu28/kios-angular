import { Injectable, Injector } from '@angular/core';
import { BaseDataListService } from 'src/app/abstracts/services/base-data-list.service';
import StoreDto, { DataFilterStore } from '../models/store.model';
import { StoreApi } from '../apis';
import { LIST_COLS } from '../pages/list/list-table.const';
import { BehaviorSubject, catchError, finalize, Observable, takeUntil, throwError } from 'rxjs';
import { ApiCommon } from '@pages/kios/common';
import { ResultDataResponse, ResultModel } from '@models/base/data.interface';

@Injectable({
  providedIn: 'root'
})
export class StoreService extends BaseDataListService<StoreDto> {

  // private subjectFilterSelection = new BehaviorSubject<ResultModel<DataFilterStore>>(null);

  // setFilterCompany(value: ResultModel<DataFilterStore>): void {
  //   this.subjectFilterSelection.next(value);
  // }

  constructor(injector: Injector,
    private _api: StoreApi,
    private _apiCommon: ApiCommon,
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
  // getFillerCompany(): void {
  //   this._apiCommon
  //     .filterCompany()
  //     .pipe(
  //       catchError((err: ResultDataResponse) => {
  //         return throwError(() => {
  //           if (err.isError) {
  //             //this.vcNotificationService.error('Error', err.errorMessage);
  //           }
  //         });
  //       }),
  //       takeUntil(this.destroy$)
  //     )
  //     .subscribe((res) => {
  //       this.setFilterCompany(res);
  //     });
  // }
  getFillerCompany(): Observable<ResultModel<DataFilterStore>> {
    return this._apiCommon.filterCompany();   
   }
}
