import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  TemplateRef
} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { DEFAULT_NAV_CONFIG } from '@common-components/base-table/base-table.const';
import {
  FilterItem,
  ItemOptions,
  TableDataCell,
  TableNavConfig
} from '@models/base-data-list';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';

@Component({
  selector: 'app-base-table-nav',
  templateUrl: './base-table-nav.component.html',
  styleUrls: ['./base-table-nav.component.less']
})
export class BaseTableNavComponent {
  @Input() nvFilters: Array<FilterItem> = [];
  @Input() nvColumns: Array<TableDataCell> = [];
  @Input() nvSelections: { [key: string]: Array<ItemOptions> } = null;
  @Input() nvNavConfig: TableNavConfig = DEFAULT_NAV_CONFIG;
  @Input() isFiltering: boolean = false;
  @Input() set nvSearchText(value: string) {
    this.setSearchText(value);
  }
  @Input() nzSelectionRender: TemplateRef<any> = null;

  @Output() nvFiltersChange: EventEmitter<Array<FilterItem>> = new EventEmitter<
    Array<FilterItem>
  >();
  @Output() nvColumnsChange: EventEmitter<Array<TableDataCell>> =
    new EventEmitter<Array<TableDataCell>>();

  public isVisibleModalShowingCols = false;
  public totalCols: number = 0;
  public numberColsDisplayed: number = 0;
  public form: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.form = this.fb.group({
      searchText: ['']
    });
  }

  ngOnInit(): void {
    this.searchText.valueChanges
      .pipe(
        debounceTime(200),
        map((searchValue: string) => searchValue?.trim() || ''),
        distinctUntilChanged()
      )
      .subscribe((searchValue) =>
        this.nvNavConfig.handleClickSearch(searchValue)
      );
  }

  get searchText(): AbstractControl {
    return this.form.controls['searchText'];
  }

  setSearchText(value: string): void {
    this.form.controls['searchText'].setValue(value);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['nvColumns']) {
      this.totalCols = this.nvColumns.length;
      this.numberColsDisplayed = this.checkColsDisplay(this.nvColumns);
    }
  }

  onClickSearch(): void {
    this.nvNavConfig.handleClickSearch(this.searchText.value?.trim() || '');
  }
  onClearSearch(): void {
    this.nvNavConfig.handleClickSearch('');
  }
  onClickFilter(event: Event): void {
    if (typeof this.nvNavConfig.handleClickFilter !== 'function') {
      return;
    }
    this.nvNavConfig?.handleClickFilter(event);
  }
  onFilterChange(event: Array<FilterItem>): void {
    this.nvFiltersChange.emit(event);
  }

  onBtnShowColClick(): void {
    this.isVisibleModalShowingCols = true;
  }

  onUpdateColsChange(value: Array<TableDataCell>): void {
    this.nvColumns = structuredClone(value);
    this.nvColumnsChange.emit(this.nvColumns);
  }

  onColumnsChange(value: Array<TableDataCell>): void {
    this.nvColumnsChange.emit(value);
  }

  private checkColsDisplay(colsProvider: Array<TableDataCell>): number {
    return colsProvider.filter((cell) => !cell.isHidden).length;
  }
}
