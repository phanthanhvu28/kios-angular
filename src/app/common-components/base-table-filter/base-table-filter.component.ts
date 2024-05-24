import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  TemplateRef
} from '@angular/core';
import { FilterItem, ItemOptions, TableDataCell } from '@models/base-data-list';
import { BaseTableFilterUtil } from './services/table-filter.service';

@Component({
  selector: 'app-base-table-filter',
  templateUrl: './base-table-filter.component.html',
  styleUrls: ['./base-table-filter.component.less']
})
export class BaseTableFilterComponent {
  @Input() nvFilters: Array<FilterItem> = [];
  @Input() nvColumns: Array<TableDataCell> = [];
  @Input() nvSelections: { [key: string]: Array<ItemOptions> } = null;
  @Input() nvTemplateRef: TemplateRef<any> = null;
  @Input() nzSelectionRender: TemplateRef<any> = null;

  @Output() nvFiltersChange: EventEmitter<Array<FilterItem>> = new EventEmitter<
    Array<FilterItem>
  >();
  @Output() nvColumnsChange: EventEmitter<Array<TableDataCell>> =
    new EventEmitter<Array<TableDataCell>>();
  @Output() onOpenFilter: EventEmitter<Event> = new EventEmitter();

  showFilter: boolean = false;
  filterItems: number = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['nvColumns']) {
      this.filterItems = this.nvColumns.filter((cellItem) =>
        BaseTableFilterUtil.checkCellFiltering(cellItem)
      ).length;
    }
  }

  onApplyFilter(event: Array<FilterItem>): void {
    this.showFilter = false;
    this.nvFiltersChange.emit(event);
  }

  onColumnsChange(event: Array<TableDataCell>): void {
    this.filterItems = this.nvColumns.filter((cellItem) =>
      BaseTableFilterUtil.checkCellFiltering(cellItem)
    ).length;
    this.nvColumnsChange.emit(event);
  }

  onVisibleFilterChange(event: boolean): void {
    if (event) {
      this.onOpenFilter.emit(new Event(''));
    }
  }
}
