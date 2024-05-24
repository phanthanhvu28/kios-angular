import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef
} from '@angular/core';
import {
  FilterItem,
  ItemOptions,
  SortDirection,
  TableDataCell
} from '@models/base-data-list';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  skip,
  Subject,
  takeUntil
} from 'rxjs';

import { BaseTableFilterUtil } from '../../services/table-filter.service';
import { CELL_FILTER_COMPARISONS, DEBOUNCE_FIRE_CHANGE_FILTER } from '@common-components/base-table-filter/base-table-filter.const';

@Component({
  selector: 'app-base-cell-filter-template',
  templateUrl: './cell-filter-template.component.html',
  styleUrls: ['./cell-filter-template.component.less']
})
export class BaseCellFilterTemplateComponent {
  @Input() nvFilters: Array<FilterItem> = [];
  @Input() nvSelection: Array<ItemOptions> = [];
  @Input() nvVisible: boolean = false;
  @Input() nvSortOrder: string | null = null;
  @Input() nzSelectionRender?: TemplateRef<any>;
  @Input() set nvColumn(column: TableDataCell) {
    this.cellFilterItem = BaseTableFilterUtil.transformFilterCol(
      column,
      undefined
    );
  }

  @Output() nvFiltersChange: EventEmitter<Array<FilterItem>> = new EventEmitter<
    Array<FilterItem>
  >();
  @Output() nvSortOrderChange: EventEmitter<string | null> = new EventEmitter<
    string | null
  >();
  @Output() nvColumnChange: EventEmitter<TableDataCell> =
    new EventEmitter<TableDataCell>();
  @Output() nvVisibleChange: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Output() nvReset: EventEmitter<Array<FilterItem>> = new EventEmitter<
    Array<FilterItem>
  >();

  isDirty: boolean = false;
  cellFilterItem: TableDataCell = null;
  readonly filterComparations = CELL_FILTER_COMPARISONS;
  readonly sortDirection = SortDirection;
  private searchText: BehaviorSubject<string> = new BehaviorSubject('');
  private searchNumber: BehaviorSubject<number> = new BehaviorSubject(0);
  private selectionValue: BehaviorSubject<string | Array<string>> =
    new BehaviorSubject('');
  private destroy$: Subject<boolean> = new Subject();

  getFilterKey(): string {
    return (
      this.cellFilterItem?.filterConfigs?.filterKey || this.cellFilterItem.key
    );
  }

  ngAfterViewInit(): void {
    this.searchText
      .pipe(
        skip(1),
        takeUntil(this.destroy$),
        debounceTime(DEBOUNCE_FIRE_CHANGE_FILTER),
        distinctUntilChanged((prev, curr) => prev?.trim() === curr?.trim())
      )
      .subscribe((value) => this.onFilterChange(value));
    this.searchNumber
      .pipe(
        skip(1),
        takeUntil(this.destroy$),
        distinctUntilChanged(),
        debounceTime(DEBOUNCE_FIRE_CHANGE_FILTER)
      )
      .subscribe((value) => this.onFilterChange(value));
    this.selectionValue
      .pipe(
        skip(1),
        takeUntil(this.destroy$),
        distinctUntilChanged(),
        debounceTime(DEBOUNCE_FIRE_CHANGE_FILTER)
      )
      .subscribe((value) => {
        this.onFilterChange(value);
      });
  }

  onFilterChange(_: any): void {
    const resultFilterData = BaseTableFilterUtil.getFilterItem(
      this.cellFilterItem
    );

    this.isDirty = true;
    if (!this.nvFilters.length && !resultFilterData.length) {
      this.setFilters([]);
      return;
    }

    const { type, startRangeKey, endRangeKey } =
      this.cellFilterItem.filterConfigs;
    const filterKey = this.getFilterKey();
    const newFilters = this.nvFilters.filter((filterItem) =>
      type === 'range-date'
        ? filterItem.fieldName !== startRangeKey &&
          filterItem.fieldName !== endRangeKey
        : filterItem.fieldName !== filterKey
    );

    this.setFilters([...structuredClone(newFilters), ...resultFilterData]);
  }

  private setFilters(newFilter: Array<FilterItem>) {
    this.nvFilters = newFilter;
    this.nvFiltersChange.emit(newFilter);
  }

  onClickReset(): void {
    const resetCol: TableDataCell = BaseTableFilterUtil.transformFilterCol(
      this.cellFilterItem,
      false
    );

    this.cellFilterItem = resetCol;
    const filterKey = this.getFilterKey();
    const newFilters = this.nvFilters.filter(
      (filterItem) => filterItem.fieldName !== filterKey
    );
    this.cellFilterItem.nzSortOrder = null;
    this.nvVisibleChange.emit(false);
    this.nvColumnChange.emit(resetCol);
    this.nvFilters = [...structuredClone(newFilters)];
    this.nvReset.emit([...structuredClone(newFilters)]);
  }

  comparatorChangeHandler(event: string, cellItem: TableDataCell): void {
    if (event === 'between') {
      if (cellItem.filterConfigs.type === 'number') {
        cellItem.filterConfigs.fieldValue = {
          start: '',
          end: ''
        };
      }
      if (cellItem.filterConfigs.type === 'date') {
        cellItem.filterConfigs.fieldValue = [];
      }
    } else {
      cellItem.filterConfigs.fieldValue = null;
    }

    this.onFilterChange(null);
  }

  onInputTextChange(value: string): void {
    this.searchText.next(value);
  }
  onSelectionChange(value: string | Array<string>): void {
    this.selectionValue.next(value);
  }

  onInputNumberChange(value: number): void {
    this.searchNumber.next(value);
  }

  onSortChange(sortDirection: string): void {
    if (this.nvSortOrder === sortDirection && sortDirection) {
      return;
    }

    this.cellFilterItem.nzSortOrder = sortDirection;
    this.nvSortOrder = sortDirection;
    this.nvSortOrderChange.emit(sortDirection);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
    if (!this.isDirty) {
      return;
    }
    this.nvColumnChange.emit({
      ...this.cellFilterItem,
      isFiltering: this.checkCellFilteringByFilters(
        this.nvFilters,
        this.cellFilterItem
      )
    });
  }

  private checkCellFilteringByFilters(
    filters: Array<FilterItem>,
    cellItem: TableDataCell
  ): boolean {
    const { type, startRangeKey, endRangeKey, filterKey } =
      cellItem.filterConfigs;
    return !!filters.find((filterItem) =>
      type === 'range-date'
        ? filterItem.fieldName === startRangeKey ||
          filterItem.fieldName === endRangeKey
        : filterItem.fieldName === cellItem.key ||
          filterItem.fieldName === filterKey
    );
  }
}
