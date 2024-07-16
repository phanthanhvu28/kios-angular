import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { DataFilterUser } from '@pages/user/models';
import { Subject } from 'rxjs';
import { AbsBaseModalComponent } from 'src/app/abstracts/components/base-modal.components';

@Component({
  selector: 'app-modal-create-edit-user',
  templateUrl: './modal-create-edit-user.component.html',
  styleUrls: ['./modal-create-edit-user.component.less']
})
export class ModalCreateEditUserComponent  implements OnDestroy {
  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
  isVisible: boolean = false;
  private _destroy$ = new Subject<void>();
  @Input() filter: DataFilterUser;
  @Output() onCancel = new EventEmitter();
  @Output() onApply = new EventEmitter();
  
  handleCancelModal(): void {
    this.onVisibleModal(false);
    // this.onCancel.emit();
  }
  handleOk(): void {   
    this.onVisibleModal(true);
    // this.onApply.emit();
  }
  onVisibleModal(value): void {   
    this.isVisible = value; 
  }
}
