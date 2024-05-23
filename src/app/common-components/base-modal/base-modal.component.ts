import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-base-modal',
  templateUrl: './base-modal.component.html',
  styleUrls: ['./base-modal.component.less']
})
export class BaseModalComponent {
  @Input() hasIconClose = true;
  @Input() className: string = '';
  @Input() size: 'default' | 'large' | number | string = 'default';
  @Input() contentDefault = true;
  @Input() title = '';
  @Input() description = '';
  @Input() footerDefault = true;
  @Input() hiddenFooter = false;
  @Input() nzAutofocus: 'ok' | 'cancel' | 'auto' | null = 'auto';

  @Input() cancelText = '';
  @Input() okText = '';

  @Input() isVisible = false;

  @Input() nzMaskClosable = true;

  @Output() isVisibleChange = new EventEmitter();
  @Output() onCancel = new EventEmitter();
  @Output() onOk = new EventEmitter();
  @Output() onClose = new EventEmitter();

  constructor() {}

  handleOk(): void {
    this.isVisibleChange.emit(false);
    this.onOk.emit();
  }

  handleCancel(): void {
    this.isVisibleChange.emit(false);
    this.onCancel.emit();
  }

  handleCloseModal(): void {
    this.isVisibleChange.emit(false);
    this.onClose.emit();
  }
}
