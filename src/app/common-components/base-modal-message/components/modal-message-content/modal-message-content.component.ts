import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReplaySubject, take, takeUntil, timer } from 'rxjs';
import { ModalMessageData } from '../../models/typings';
import { MESSAGE_TYPE_ICONS } from './modal-message-content.const';


@Component({
  selector: 'app-modal-message-content',
  templateUrl: './modal-message-content.component.html',
  styleUrls: ['./modal-message-content.component.less']
})
export class ModalMessageContentComponent {
  readonly DEFAULT_MODAL: ModalMessageData = {
    title: '',
    content: '',
    buttons: [
      {
        label: 'Close',
        command: (close: () => void) => {
          close();
        }
      }
    ],
    size: 'default',
    hasCloseIcon: true
  };
  @Input() modalData: ModalMessageData = this.DEFAULT_MODAL;
  @Input() footerDefault: boolean = true;
  @Input() content: string = '';
  @Input() title: string = '';
  @Input() size: string | number = undefined;

  @Input() isVisible = true;
  @Output() isVisibleChange: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Output() onClose: EventEmitter<string> = new EventEmitter<string>();

  private readonly _destroy$: ReplaySubject<boolean> = new ReplaySubject(1);
  ngAfterViewInit(): void {
    if (this.modalData && this.modalData.closeAfter) {
      timer(this.modalData.closeAfter)
        .pipe(take(1), takeUntil(this._destroy$))
        .subscribe((_) => this.handleCloseModal());
    }
  }

  get modalSize(): number {
    const sizeProvider = {
      default: 480,
      large: 960
    };
    if (!this.modalData.size && !this.size) {
      return sizeProvider.default;
    }

    if (typeof this.modalData.size === 'string') {
      return sizeProvider[this.modalData.size];
    }

    if (typeof this.size === 'string') {
      return sizeProvider[this.size];
    }

    return this.modalData.size || this.size;
  }

  get typeIcon(): string {
    if (!this.modalData.type) {
      return MESSAGE_TYPE_ICONS.success;
    }

    return MESSAGE_TYPE_ICONS[this.modalData.type];
  }

  handleCloseModal(): void {
    this.isVisible = false;
    this.isVisibleChange.emit(false);
    if (this.modalData.onClose) {
      this.modalData.onClose();
    }
    if (this.onClose) {
      this.onClose.emit(this.modalData.messageId);
    }
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
  }
}
