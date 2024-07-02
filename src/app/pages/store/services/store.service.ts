import { Injectable, Injector } from '@angular/core';
import { BaseDataListService } from 'src/app/abstracts/services/base-data-list.service';
import StoreDto from '../models/store.model';
import { StoreApi } from '../apis';
import { LIST_COLS } from '../pages/list/list-table.const';
import { finalize, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService extends BaseDataListService<StoreDto> {

  constructor(injector: Injector,
    private _api: StoreApi,
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
}
