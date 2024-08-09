import { Injectable, Injector } from '@angular/core';
import { BaseDataListService } from 'src/app/abstracts/services/base-data-list.service';
import { ResultModel } from '@models/base/data.interface';
import { BehaviorSubject, catchError, finalize, Observable, of, takeUntil } from 'rxjs';
import { ApiCommon } from '@pages/kios/common';
import { NotificationService } from 'src/app/notification/notification.service';
import { LIST_COLS } from '../pages/list/list-table.const';
import { isNil } from 'ng-zorro-antd/core/util';
import { TypeBidaApi } from '../apis';
import TypeBidaBaseDto, { DataFilterTypeBida, DeleteTypeBidaRequest, TypeBidaRequest } from '../models/type-bida.model';

@Injectable({
  providedIn: 'root'
})
export class TypeBidaService extends BaseDataListService<TypeBidaBaseDto>{
  private subjectBehavior = new BehaviorSubject<any>(null);
  entityObservable$: Observable<ResultModel<TypeBidaBaseDto>> = this.subjectBehavior;
  
  constructor(injector: Injector,
    private _api: TypeBidaApi,
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
  getFillerTypeBida(): Observable<ResultModel<DataFilterTypeBida>> {
    return this._apiCommon.filterTypeBida();   
  }
  create(payload:TypeBidaRequest):void{
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
        'Created type bida successfully!'
      );
    });
  }
  update(payload:TypeBidaRequest):void{
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
        'Update type bida successfully!'
      );
    });
  }
  delete(payload:DeleteTypeBidaRequest):void{
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
        'Delete type bida successfully!'
      );
    });
  }

}
