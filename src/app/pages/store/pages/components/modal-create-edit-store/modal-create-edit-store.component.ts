import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataFilterStore, DropdownValueCompany } from '@pages/store/models';
import { Observable } from 'rxjs';
import { AbsBaseModalComponent } from 'src/app/abstracts/components/base-modal.components';
import { NvValidators } from 'src/app/utils/validators';

@Component({
  selector: 'app-modal-create-edit-store',
  templateUrl: './modal-create-edit-store.component.html',
  styleUrls: ['./modal-create-edit-store.component.less']
})
export class ModalCreateEditStoreComponent extends AbsBaseModalComponent {
  sizeModal: number | string = 820;
  isFullScreen: boolean = false;
  @Input() id: string = null;
  // @Input() dataDetail: CompanyRequest;

  @Input() filter: any;

  createForm: FormGroup;
  @Output() handelSubmit: EventEmitter<boolean> = new EventEmitter<boolean>();
  loading$: Observable<boolean>;
  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    //private companyService: CompanyService
  ) {
    super();
  //  this.loading$ = this.companyService.loading$;
   // this.watch();
  }
  
  
  protected override initShow(args?: any): void {
    this.initForm();
    if (args) {
   // this.initFormUpload();
    }
  }
  initForm(): void {
    this.createForm = this.fb.group({
      code:[''],
      name: ['', NvValidators.required],
      address: ['', NvValidators.required],
      email:[''],
      phone:['']
    });
  }
  onSave(): void {
    const payload = {
      ...this.createForm.value
    }
    //this.companyService.create(payload);
  }
  closeCheckChange() {   
    this.close();
  }
  fullscreenToggle(): void {
    this.isFullScreen = !this.isFullScreen;
    this.isFullScreen ? (this.sizeModal = '100vw') : (this.sizeModal = 820);
  }
  selectSupplier(value: DropdownValueCompany) {
    this.createForm
      .get('supplierCode')
      .setValue(value.value.companyCode);
    this.createForm.get('supplierFullName').setValue(value.label);
    this.createForm
      .get('supplierShortName')
      .setValue(value.value.companyName);
  }
}
