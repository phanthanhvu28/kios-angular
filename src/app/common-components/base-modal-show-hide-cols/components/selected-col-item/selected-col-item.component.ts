import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableDataCell } from '@models/base-data-list';

@Component({
  selector: 'app-selected-col-item',
  templateUrl: './selected-col-item.component.html',
  styleUrls: ['./selected-col-item.component.less']
})
export class SelectedColItemComponent {
  @Input() itemData: TableDataCell;
  @Input() nvAllowDrag: boolean = true;
  @Output() onClickRemove: EventEmitter<TableDataCell> =
    new EventEmitter<TableDataCell>();

  clickRemoveHandler() {
    if (!this.onClickRemove) return;

    this.itemData.isHidden = true;
    this.onClickRemove.emit(this.itemData);
  }
}
