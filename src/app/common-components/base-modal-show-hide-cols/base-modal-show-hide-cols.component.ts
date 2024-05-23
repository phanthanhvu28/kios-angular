import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TableDataCell } from '@models/base-data-list';
import { isNil } from 'ng-zorro-antd/core/util';

@Component({
  selector: 'app-base-modal-show-hide-cols',
  templateUrl: './base-modal-show-hide-cols.component.html',
  styleUrls: ['./base-modal-show-hide-cols.component.less']
})
export class BaseModalShowHideColsComponent {
  @Input() isVisible: boolean = false;
  @Input() nvAllowDrag: boolean = true;
  @Input() set nvColumns(value: Array<TableDataCell>) {
    this._nvColumns = structuredClone(value);
    this.displayCols = [];
    this.hiddenCols = [];
    this.displayCols = this._nvColumns.filter((colItem) => !colItem.isHidden);
    this.hiddenCols = this._nvColumns.filter(
      (colItem) => colItem.isHidden && colItem.nvHidable !== false
    );
  }

  @Output() isVisibleChange: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  @Output() onClose = new EventEmitter();
  @Output() onCancel = new EventEmitter();
  @Output() onApply = new EventEmitter();

  public displaySearch: string = '';
  public hideSearch: string = '';
  public displayCols: Array<TableDataCell> = [];
  public hiddenCols: Array<TableDataCell> = [];
  public formGroup: FormGroup;
  private _nvColumns: Array<TableDataCell> = [];
  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      availableColsSearch: [''],
      selectedColsSearch: ['']
    });
  }

  get displaySearchText(): string {
    return this.formGroup.controls.selectedColsSearch.value;
  }

  get hideSearchText(): string {
    return this.formGroup.controls.availableColsSearch.value;
  }

  onVisibleModalChange(value: boolean): void {
    this.isVisibleChange.emit(value);
  }

  displayColHandler(item: TableDataCell): void {
    const indexItem = this.getColIndexByKey(this.hiddenCols, item.key);
    this.hiddenCols.splice(indexItem, 1);
    if (this.nvAllowDrag || isNil(item['prevIndex'])) {
      this.displayCols.push(item);
      return;
    }
    this.displayCols.splice(item['prevIndex'], 0, item);
  }

  hideColHandler(item: TableDataCell, cellIndex: number): void {
    const indexItem = this.getColIndexByKey(this.displayCols, item.key);
    this.displayCols.splice(indexItem, 1);
    this.hiddenCols.push(item);
    item['prevIndex'] = null;
    if (this.nvAllowDrag) {
      return;
    }
    item['prevIndex'] = cellIndex;
  }

  onClickCancelModalFilter(): void {
    this.onVisibleModalChange(false);
    this.onCancel.emit();
  }

  onClickApplyModalFilter(): void {
    const changeArr = this.displayCols.concat(this.hiddenCols);
    this.onVisibleModalChange(false);
    this.onApply.emit(this.sortingStickCol(changeArr));
  }

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.displayCols, event.previousIndex, event.currentIndex);
  }

  private getColIndexByKey(cols: Array<TableDataCell>, key: string): number {
    return cols.findIndex((colItem) => colItem.key === key);
  }

  // sort left sticky column to start
  // sort right sticky column to end
  private sortingStickCol(cells: Array<TableDataCell>): Array<TableDataCell> {
    const newCols = structuredClone(cells);
    return newCols.sort((a, b) => {
      if ((a.rightStick && !b.rightStick) || (!a.leftStick && b.leftStick)) {
        return 1;
      }
      if ((!a.rightStick && b.rightStick) || (a.leftStick && !b.leftStick)) {
        return -1;
      }

      return 0;
    });
  }
}
