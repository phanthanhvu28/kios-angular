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
  TableDataCell,
  TableNavConfig,
  TableRowHighlightConfig
} from '@models/base-data-list';
import {
  NzTableComponent,
  NzTableDataService,
  NzTableQueryParams
} from 'ng-zorro-antd/table';
import { DEFAULT_NAV_CONFIG } from './base-table.const';
@Component({
  selector: 'app-base-table',
  templateUrl: './base-table.component.html',
  styleUrls: ['./base-table.component.less'],
  providers: [NzTableDataService]
})
export class BaseTableComponent extends NzTableComponent<any> {
  @Input() nvFilters: Array<FilterItem> = [];
  @Input() nzColumns: Array<TableDataCell> = [];
  @Input() nvShowNav: boolean = true;
  @Input() nvEnableVirtualScroll: boolean = false;
  @Input() nvRowHighlightConfig: TableRowHighlightConfig = null;
  @Input() isFiltering: boolean = false;
  @Input() nzBodyRender?: TemplateRef<any>;
  @Input() nzSelectionRender?: TemplateRef<any>;
  @Input() nvSelections: { [key: string]: Array<ItemOptions> } = null;
  @Input() nvSearchText: string = '';
  @Input() nvShowColumnOrder: boolean = true;

  private _nvNavConfig: TableNavConfig = DEFAULT_NAV_CONFIG;
  @Input() set nvNavConfig(newConfig: TableNavConfig) {
    this._nvNavConfig = {
      ...DEFAULT_NAV_CONFIG,
      ...newConfig
    };
  }
  get nvNavConfig(): TableNavConfig {
    return this._nvNavConfig;
  }

  @Output() nvFiltersChange: EventEmitter<Array<FilterItem>> = new EventEmitter<
    Array<FilterItem>
  >();
  @Output() nzSortOrderChange: EventEmitter<Array<string>> = new EventEmitter();
  @Output() onItemSelection: EventEmitter<any> = new EventEmitter();
  @Output() onCheckedChange: EventEmitter<void> = new EventEmitter();
  @Output() onShowHideCols: EventEmitter<Array<TableDataCell>> =
    new EventEmitter();
  @Output() onCellFilterReset?: EventEmitter<{
    sorts: Array<string>;
    filters: Array<FilterItem>;
  }> = new EventEmitter<{ sorts: Array<string>; filters: Array<FilterItem> }>();

  sortOrderChange(value: Array<string>): void {
    this.nzSortOrderChange.emit(value);
  }

  colsUpdateHandler(value: Array<TableDataCell>): void {
    this.nzColumns = structuredClone(value);
    this.onShowHideCols.emit(this.nzColumns);
  }

  itemSelectionHandler(dataRow: any): void {
    this.onItemSelection.emit(dataRow);
  }

  checkedHandler(): void {
    this.onCheckedChange.emit();
  }

  filterChangeHandler(event: Array<FilterItem>): void {
    this.nvFiltersChange.emit(event);
  }

  cellFilterResetHandler(event: {
    sorts: Array<string>;
    filters: Array<FilterItem>;
  }): void {
    this.onCellFilterReset.emit(event);
  }

  onCurrentPageDataChange(event: readonly any[]): void {
    this.nzCurrentPageDataChange.emit(event);
  }
  onQueryParams(event: NzTableQueryParams): void {
    this.nzQueryParams.emit(event);
  }
}
