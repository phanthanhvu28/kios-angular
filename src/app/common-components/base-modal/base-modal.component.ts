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
  @Output() onAfterClose = new EventEmitter<void>();

  constructor() {}

  handleOk(): void {
    console.log('handleOk');
    this.isVisibleChange.emit(false);
    this.onOk.emit();
  }

  handleCancel(): void {
    console.log('handleCancel');
    this.isVisibleChange.emit(false);
    this.onCancel.emit();
  }

  handleCloseModal(): void {
    console.log('handleCloseModal');
    this.isVisibleChange.emit(false);
    this.onClose.emit();
  }

  // handleAfterClose():void{
  //   console.log('Modal closed');
  //   this.isVisibleChange.emit(false);
  //   this.onAfterClose.emit();
  // }
}
