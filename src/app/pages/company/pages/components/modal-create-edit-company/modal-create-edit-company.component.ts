import { Component, Input } from '@angular/core';
import { AbsBaseModalComponent } from 'src/app/abstracts/components/base-modal.components';

@Component({
  selector: 'app-modal-create-edit-company',
  templateUrl: './modal-create-edit-company.component.html',
  styleUrls: ['./modal-create-edit-company.component.less']
})
export class ModalCreateEditCompanyComponent extends AbsBaseModalComponent {
  sizeModal: number | string = 820;
  isFullScreen: boolean = false;
  @Input() id: string = null;
  protected override initShow(args?: any): void {
    throw new Error('Method not implemented.');
  }

  closeCheckChange() {   
    this.close();
  }

}
