import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableDataCell } from '@models/base-data-list';

@Component({
  selector: 'app-available-col-item',
  templateUrl: './available-col-item.component.html',
  styleUrls: ['./available-col-item.component.less']
})
export class AvailableColItemComponent {
  @Input() itemData: TableDataCell;
  @Output() onClickAdd: EventEmitter<TableDataCell> =
    new EventEmitter<TableDataCell>();

  clickAddHandler() {
    if (!this.onClickAdd) return;

    this.itemData.isHidden = false;
    this.onClickAdd.emit(this.itemData);
  }
}
