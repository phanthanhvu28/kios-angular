import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {
  FilterItem,
  ItemOptions,
  TableDataCell,
  TableRowHighlightConfig
} from '@models/base-data-list';
import { NvSafeAny } from '@models/base/data.interface';
import { isNil } from 'ng-zorro-antd/core/util';
import { NzTableComponent, NzTableQueryParams } from 'ng-zorro-antd/table';
import { SortDirection } from 'src/app/models/base-data-list';

@Component({
  selector: 'app-base-table-body',
  templateUrl: './base-table-body.component.html',
  styleUrls: ['./base-table-body.component.less'],
  encapsulation: ViewEncapsulation.Emulated
})
export class BaseTableBodyComponent extends NzTableComponent<any> {
  @Input() nvColumns: Array<TableDataCell> = [];
  @Input() nvFilters: Array<FilterItem> = [];
  @Input() nzBodyRender?: TemplateRef<any>;
  @Input() nzSelectionRender?: TemplateRef<any>;
  @Input() nvSelections: { [key: string]: Array<ItemOptions> } = null;
  @Input() nvRowHighlightConfig: TableRowHighlightConfig = null;
  @Input() nvShowColumnOrder: boolean = true;
  @Input() nvEnableVirtualScroll: boolean = false;

  @Output() nvFiltersChange: EventEmitter<Array<FilterItem>> = new EventEmitter<
    Array<FilterItem>
  >();
  @Output() nvColumnsChange: EventEmitter<Array<TableDataCell>> =
    new EventEmitter<Array<TableDataCell>>();
  @Output() nzSortOrderChange?: EventEmitter<Array<string>> =
    new EventEmitter();
  @Output() onItemSelection?: EventEmitter<any> = new EventEmitter();
  @Output() onCheckedChange?: EventEmitter<void> = new EventEmitter();
  @Output() onCellFilterReset?: EventEmitter<{
    sorts: Array<string>;
    filters: Array<FilterItem>;
  }> = new EventEmitter<{ sorts: Array<string>; filters: Array<FilterItem> }>();

  @ViewChild('nvTableBodyRef', { static: true }) nvTableBodyRef: ElementRef =
    null;

  sortDirectionDefault: Array<string | null> = ['ascend', 'descend', null];
  public isAllChildDisabled: boolean = false;
  public isSelectedAll: boolean = false;
  public isSelectedItems: boolean = false;
  public isScrollYVisible: boolean = false;
  public hasStickRightCell: boolean = false;
  private sortKeys: { [key: string]: string } = {};

  private get selectedItems(): number {
    return this.nzData.filter((dataItem) => !!dataItem['selected']).length;
  }

  override ngOnChanges(simpleChanges: SimpleChanges): void {
    super.ngOnChanges(simpleChanges);

    if (simpleChanges['nzData'] || simpleChanges['nzScroll']) {
      this.isAllChildDisabled =
        this.nzData.filter((rowData) => !!rowData['selectionDisabled'])
          .length === this.nzData.length;

      setTimeout(() => {
        const body: HTMLElement =
          this.nvTableBodyRef.nativeElement.querySelector('.ant-table-body');

        this.isScrollYVisible = body?.scrollHeight > body?.clientHeight;
      });
    }

    if (simpleChanges['nvColumns']) {
      this.hasStickRightCell = !!this.nvColumns.find((col) => col.rightStick);
      this.nvColumns = this.setStickRightValue();
      this.nvColumns = this.setStickLeftValue();
    }

    if (simpleChanges['nzData']?.currentValue?.length > 0) {
      this.isSelectedAll = this.selectedItems === this.nzData.length;
    }

    // this.onCheckedChange.emit();
  }

  onCurrentPageDataChange(event: readonly any[]): void {
    this.nzCurrentPageDataChange.emit(event);
  }
  onQueryParams(event: NzTableQueryParams): void {
    this.nzQueryParams.emit(event);
  }
  onFiltersChange(event: Array<FilterItem>): void {
    this.nvFiltersChange.emit(event);
  }
  onColumnChange(_: TableDataCell): void {
    this.nvColumnsChange.emit(this.nvColumns);
  }

  onSortChange(event: string | null, cellItem: TableDataCell): void {
    const { sortKey, key } = cellItem;
    const validSortKey = sortKey || key;
    this.nvColumns = this.resetSortOder(this.nvColumns, validSortKey);
    this.nzSortOrderChange.emit(this.mapSortValue(event, validSortKey));

    // TODO: disabled multi sort column
    // if (this.sortKeys[validSortKey] && event === null) {
    //   delete this.sortKeys[validSortKey];
    //   this.nzSortOrderChange.emit(Object.values(this.sortKeys));

    //   return;
    // }
    // if (event === null) {
    //   return;
    // }

    // this.sortKeys[validSortKey] = this.mapSortValue(event, validSortKey);
    // this.nzSortOrderChange.emit(Object.values(this.sortKeys));
  }

  cellFilterResetHandler(
    filters: Array<FilterItem> | null,
    cellItem: TableDataCell
  ): void {
    const { sortKey, key } = cellItem;
    const validSortKey = sortKey || key;
    this.nvColumns = this.resetSortOder(this.nvColumns, validSortKey);
    cellItem.nzSortOrder = null;
    this.nvFilters = filters;
    this.onCellFilterReset.emit({
      sorts: this.mapSortValue(null, validSortKey),
      filters
    });
  }

  onRowClick(dataRow: any): void {
    this.onItemSelection.emit(dataRow);
  }

  onClickSelectAll(newState: boolean): void {
    this.isSelectedAll = newState;
    this.nzData.forEach((rowData) => {
      if (!rowData['selectionDisabled']) {
        rowData['selected'] = newState;
      }
    });

    this.onCheckedChange.emit();
  }

  onClickSelectItem(
    rowData: any,
    selectionConfig: NvSafeAny,
    newState: boolean
  ): void {
    rowData['selected'] = newState;

    this.isSelectedItems = this.selectedItems > 0;
    this.isSelectedAll =
      this.selectedItems === itemsSelectable.bind(this, selectionConfig)();

    this.onCheckedChange.emit();

    function itemsSelectable(selectionConfig: NvSafeAny): number {
      return this.nzData.filter(
        (dataItem) => !dataItem[selectionConfig?.disabledKey]
      ).length;
    }
  }

  private mapSortValue(direction: string, key: string): Array<string> {
    if (
      isNil(SortDirection[direction]) ||
      SortDirection[direction] === SortDirection.null
    ) {
      return [];
    }

    const upperCaseKey = key.charAt(0).toUpperCase() + key.slice(1);
    return [`${upperCaseKey}${SortDirection[direction]}`];
  }

  private setStickRightValue(): Array<TableDataCell> {
    let nvRight: number;
    let nvRightNext: number = 0;
    const reverseArr = structuredClone(this.nvColumns).reverse();

    const newCols = reverseArr.map((cellItem) => {
      if (
        cellItem.rightStick !== true ||
        !cellItem.width ||
        !!cellItem.isHidden
      ) {
        return cellItem;
      }

      nvRight = nvRightNext;
      nvRightNext += parseFloat(cellItem.width.replaceAll('px', ''));

      return {
        ...cellItem,
        rightStick: `${nvRight}px`
      };
    });

    return newCols.reverse();
  }

  private setStickLeftValue(): Array<TableDataCell> {
    let nvLeft: number;
    let nvLeftNext: number = 0;

    const newCols = structuredClone(this.nvColumns).map((cellItem) => {
      if (
        cellItem.leftStick !== true ||
        !cellItem.width ||
        !!cellItem.isHidden
      ) {
        return cellItem;
      }
      nvLeft = nvLeftNext;
      nvLeftNext += parseFloat(cellItem.width.replaceAll('px', ''));

      return {
        ...cellItem,
        leftStick: `${nvLeft}px`
      };
    });

    return newCols;
  }

  private resetSortOder(
    columns: Array<TableDataCell>,
    exceptionKey: Array<string> | string
  ): Array<TableDataCell> {
    return columns.map((cell) => {
      const inExceptionCells =
        (Array.isArray(exceptionKey) &&
          (exceptionKey.includes(cell.key) ||
            exceptionKey.includes(cell.sortKey))) ||
        exceptionKey === cell.key ||
        exceptionKey === cell.sortKey;

      if (inExceptionCells) {
        return cell;
      }

      cell.nzSortOrder = null;
      return { ...cell };
    });
  }
}
