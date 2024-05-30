import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef
} from '@angular/core';
import {
  FilterCellConfig,
  FilterItem,
  ItemOptions,
  TableDataCell
} from '@models/base-data-list';
import { CELL_FILTER_COMPARISONS } from '../../base-table-filter.const';
import { BaseTableFilterUtil } from '../../services/table-filter.service';

@Component({
  selector: 'app-base-table-filter-template',
  templateUrl: './table-filter-template.component.html',
  styleUrls: ['./table-filter-template.component.less']
})
export class BaseTableFilterTemplateComponent {
  @Input() nvFilters: Array<FilterItem> = [];
  @Input() nvSelections: { [key: string]: Array<ItemOptions> } = {};
  @Input() nzSelectionRender?: TemplateRef<any>;
  @Input() set nvColumns(cols: Array<TableDataCell>) {
    this.cellFilterItems = BaseTableFilterUtil.transformFilterCols(
      cols,
      undefined
    );
  }
  @Output() nvFiltersChange: EventEmitter<Array<FilterItem>> =
    new EventEmitter();
  @Output() nvColumnsChange: EventEmitter<Array<TableDataCell>> =
    new EventEmitter();

  cellFilterItems: Array<TableDataCell> = [];
  readonly filterComparations = CELL_FILTER_COMPARISONS;

  onClickApply(): void {
    const isRequiredFilter: boolean = BaseTableFilterUtil.checkRequired(
      this.cellFilterItems
    );

    if (isRequiredFilter) {
      return;
    }

    const resultFilterData = BaseTableFilterUtil.getFilterItems(
      this.cellFilterItems
    );

    this.nvFiltersChange.emit(resultFilterData);
    this.nvColumnsChange.emit(this.cellFilterItems);
  }

  onClickClear(): void {
    const resetArr: Array<TableDataCell> =
      BaseTableFilterUtil.transformFilterCols(this.cellFilterItems, false);

    this.nvFilters = [];
    this.cellFilterItems = resetArr;
    this.nvFiltersChange.emit([]);
    this.nvColumnsChange.emit(resetArr);
  }

  onClickFilterItem(newState: boolean, cellItem: TableDataCell): void {
    cellItem.isFiltering = newState;
  }

  comparatorChangeHandler(
    event: string,
    filterConfigs: FilterCellConfig
  ): void {
    if (event === 'between') {
      filterConfigs.fieldValue = [];
    } else {
      filterConfigs.fieldValue = null;
    }
  }
}
