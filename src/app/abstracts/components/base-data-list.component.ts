import { AsyncPipe } from '@angular/common';
import { Component, ElementRef, Optional } from '@angular/core';
import {
  FilterItem,
  TableDataCell,
  TableNavConfig
} from '@models/base-data-list';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import {
  BehaviorSubject,
  Observable,
  ReplaySubject,
  debounceTime,
  distinct,
  distinctUntilChanged,
  distinctUntilKeyChanged,
  filter,
  fromEvent,
  pairwise,
  take,
  takeUntil,
  tap,
  timer
} from 'rxjs';
// import { Utils } from 'src/app/utils/utils';

@Component({
  template: ''
})
export abstract class AbsBaseDataListComponent<T> {
  public tableHeight: number = 0;
  public observerTableHeight: MutationObserver = null;
  public filterData: Array<any> = [];
  public currentTabService: any;
  public loading$: Observable<boolean>;
  public dataItemCells$: Observable<Array<TableDataCell>>;
  public dataItems$: Observable<Array<T>>;
  public totalItem$: Observable<number>;
  public pageIndex$: Observable<number>;
  public pageSize$: Observable<number>;
  public searchText: string = '';
  public searchText$: Observable<string>;
  protected destroy$: ReplaySubject<boolean> = new ReplaySubject(1);

  private nvPageIndex: number = 1;
  private nzQueryParams$: BehaviorSubject<NzTableQueryParams> =
    new BehaviorSubject<NzTableQueryParams>(null);
  public readonly nvNavConfig: TableNavConfig = {
    nvShowHideCols: true,
    nvShowSearch: true,
    nvShowDefaultFilter: true,
    nvShowFilter: true,
    nvSearchPosition: 'left',
    handleClickSearch: (newState: string) => this.search(newState),
    handleClickFilter: (_) => {}
  };

  protected abstract getDataListService(): void;

  constructor(@Optional() protected el: ElementRef) {
    this.onQueryParamsChange();
  }

  protected ngOnInit(): void {
    // Utils.subscribeEvent('RELOAD_PAGE')
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe((_) => this.getTableData());
    this.initial();

    this.onWindowResize();
  }

  initial() {
    this.getDataListService();
    this.getTableData();
    this.loading$ = this.currentTabService.loading$;
    this.dataItemCells$ = this.currentTabService.dataItemCells$;
    this.dataItems$ = this.currentTabService.dataItems$;
    this.totalItem$ = this.currentTabService.totalItem$;
    this.pageIndex$ = this.currentTabService.pageIndex$;
    this.pageSize$ = this.currentTabService.pageSize$;
    this.searchText$ = this.currentTabService.searchText$;
    this.pageIndex$
      .pipe(takeUntil(this.destroy$))
      .subscribe((index: number) => {
        this.nvPageIndex = index;
      });
  }

  getTableData(): void {
    this.currentTabService.getTableData();
  }

  search(searchText: string): void {
    this.searchText = searchText;
    this.currentTabService.searchHandler(searchText);
  }

  public changePageIndex(pageIndex: number): void {
    this.currentTabService.goToPage(pageIndex);
  }

  public changePageSize(pageSize: number): void {
    this.currentTabService.changePageSize(pageSize);
  }

  public queryParamsChange(nzQueryParams: NzTableQueryParams): void {
    this.nzQueryParams$.next(nzQueryParams);
  }

  public onSortOrderChange(event: Array<string>): void {
    this.currentTabService.sorts = event;
    this.getTableData();
  }

  public setTableHeight(currentEl: HTMLElement): void {
    //this.tableHeight = Utils.getTableHeight(currentEl);
    //Utils.setTableHeight(currentEl, this.tableHeight);
  }

  public handleShowHideCols(cols: Array<TableDataCell>): void {
    this.currentTabService.setDataItemCells(cols);
  }

  public onCellFilterReset({
    sorts,
    filters
  }: {
    sorts: Array<string>;
    filters: Array<FilterItem>;
  }): void {
    this.currentTabService.sorts = sorts;
    this.setFilterData(filters);
  }

  updateTableHeight(_?: boolean): void {
    if (!this.el) {
      return;
    }

    timer(100)
      .pipe(take(1))
      .subscribe(() => this.setTableHeight(this.el.nativeElement));
  }

  public setFilterData(value: Array<FilterItem>): void {
    const trimFilterValue = value.map((filterItem) => {
      if (typeof filterItem.fieldValue !== 'string') {
        return filterItem;
      }

      return {
        ...filterItem,
        fieldValue: filterItem.fieldValue.trim()
      };
    });

    this.filterData = trimFilterValue;
    this.currentTabService.filter = trimFilterValue;
    this.currentTabService.setPageIndex(1);
    this.getTableData();
  }

  ngOnDestroy(): void {
    this.currentTabService.destroy();
    this.destroy$.next(true);
    this.destroy$.complete();
    if (this.observerTableHeight) {
      this.observerTableHeight.disconnect();
    }
  }

  private onWindowResize(): void {
    fromEvent(window, 'resize')
      .pipe(takeUntil(this.destroy$), debounceTime(1000))
      .subscribe((_) => {
        if (!this.el) return;

        this.setTableHeight(this.el.nativeElement);
      });
  }

  private onQueryParamsChange(): void {
    this.nzQueryParams$
      .pipe(
        takeUntil(this.destroy$),
        pairwise(),
        filter(([prev, _]) => !!prev),
        tap(([prev, curr]) => {
          if (prev.pageSize !== curr.pageSize) {
            this.changePageSize(curr.pageSize);
            return;
          }
          if (
            prev.pageIndex !== curr.pageIndex &&
            curr.pageIndex !== this.nvPageIndex
          ) {
            this.changePageIndex(curr.pageIndex);
          }
        })
      )
      .subscribe();
  }
}
