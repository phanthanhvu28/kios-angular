import { AsyncPipe } from '@angular/common';
import { Injectable, Injector, Optional } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataListRequestPayload, FilterComparison, TableDataCell } from '@models/base-data-list';
import { BehaviorSubject, Observable, ReplaySubject, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseDataListService<T> {
  protected pageIndexNumber: number = 1;
  protected pageSizeNumber: number = 10;
  protected searchText: string = '';

  private subjectLoading = new BehaviorSubject<boolean>(false);
  private subjectDataItems = new BehaviorSubject<Array<any>>([]);
  private subjectDataItemCells = new BehaviorSubject<Array<TableDataCell>>([]);
  private subjectTotalItem = new BehaviorSubject<number>(0);
  private subjectPageIndex = new BehaviorSubject<number>(this.pageIndexNumber);
  private subjectPageSize = new BehaviorSubject<number>(this.pageSizeNumber);
  private subjectSearchText = new BehaviorSubject<string>(null);
  // private subjectProcessFlows = new BehaviorSubject<Array<ProcessFlowModel>>(
  //   []
  // );

  public loading$: Observable<boolean> = this.subjectLoading.asObservable();
  public dataItemCells$: Observable<Array<TableDataCell>> =
    this.subjectDataItemCells.asObservable();
  public dataItems$: Observable<Array<any>> =
    this.subjectDataItems.asObservable();
  public totalItem$: Observable<number> = this.subjectTotalItem.asObservable();
  public pageIndex$: Observable<number> = this.subjectPageIndex.asObservable();
  public pageSize$: Observable<number> = this.subjectPageSize.asObservable();
  public searchText$: Observable<string> =
    this.subjectSearchText.asObservable();
  // public processFlows$: Observable<Array<ProcessFlowModel>> =
  //   this.subjectProcessFlows.asObservable();
  // Filter && Search && Pagination
  filter: Array<any> = [];
  sorts: Array<string> = [];
  destroy$: ReplaySubject<boolean> = new ReplaySubject(1);

  asyncPipe: AsyncPipe;
  router: Router;
  activatedRoute: ActivatedRoute;
  //messageService: NvMessageService;
  constructor(@Optional() protected injector: Injector) {
    this.asyncPipe = this.injector.get(AsyncPipe);
    this.router = this.injector.get(Router);
    this.activatedRoute = this.injector.get(ActivatedRoute);
    //this.messageService = this.injector.get(NvMessageService);

    this.pageIndex$.pipe(takeUntil(this.destroy$)).subscribe((res) => {
      this.pageIndexNumber = res;
    });
    this.pageSize$.pipe(takeUntil(this.destroy$)).subscribe((res) => {
      this.pageSizeNumber = res;
    });
  }

  public abstract getTableData(): void;

  searchHandler(searchText: string): void {
    this.searchText = searchText;
    this.subjectPageIndex.next(1);
    this.getTableData();
  }

  protected setSearchText(value: string): void {
    this.subjectSearchText.next(value);
  }

  public getPayload(): DataListRequestPayload {
    const search = {
      fieldName: 'code',
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

  // Panigation
  protected goToPage(pageIndex: number): void {
    this.subjectPageIndex.next(pageIndex);
    this.getTableData();
  }

  protected setDefaultPageSize(pageSize: number): void {
    this.subjectPageIndex.next(1);
    this.subjectPageSize.next(pageSize);
  }

  protected changePageSize(pageSize: number): void {
    this.subjectPageIndex.next(1);
    this.subjectPageSize.next(pageSize);
    this.getTableData();
  }

  protected destroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  protected setLoading(isLoading: boolean): void {
    this.subjectLoading.next(isLoading);
  }
  protected setDataItemCells(columns: Array<TableDataCell>): void {
    this.subjectDataItemCells.next(columns);
  }
  public setDataItems(dataBody: Array<any>): void {
    this.subjectDataItems.next(dataBody);
  }

  protected setPageIndex(pageIndex: number): void {
    this.subjectPageIndex.next(pageIndex);
  }
  protected setPageSize(pageSize: number): void {
    this.subjectPageSize.next(pageSize);
  }

  protected setTotalItem(totalItem: number): void {
    this.subjectTotalItem.next(totalItem);
  }
}
