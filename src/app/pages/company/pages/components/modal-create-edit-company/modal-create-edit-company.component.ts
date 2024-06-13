import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AbsBaseModalComponent } from 'src/app/abstracts/components/base-modal.components';
import CompanyRequest from '../../../models/company.model';
import { NvValidators } from 'src/app/utils/validators';
import { CompanyService } from '@pages/company/services';
import { Observable, takeUntil } from 'rxjs';
import { isNil } from 'ng-zorro-antd/core/util';
@Component({
  selector: 'app-modal-create-edit-company',
  templateUrl: './modal-create-edit-company.component.html',
  styleUrls: ['./modal-create-edit-company.component.less']
})
export class ModalCreateEditCompanyComponent extends AbsBaseModalComponent {
  sizeModal: number | string = 820;
  isFullScreen: boolean = false;
  @Input() id: string = null;
  @Input() dataDetail: CompanyRequest;
  createForm: FormGroup;
  @Output() handelSubmit: EventEmitter<boolean> = new EventEmitter<boolean>();
  loading$: Observable<boolean>;
  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private companyService: CompanyService
  ) {
    super();
    this.loading$ = this.companyService.loading$;
    this.watch();
  }
  
  initShow(args){
    this.initForm();
    if (args) {
    this.initFormUpload();
    }
  }
  initFormUpload() {
    this.createForm.patchValue({
      code:this.dataDetail.code,
      name: this.dataDetail.name,
      address:this.dataDetail.address,
      email:this.dataDetail.email,
      phone:this.dataDetail.phone
    });

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
  closeCheckChange() {   
    this.close();
  }

  fullscreenToggle(): void {
    this.isFullScreen = !this.isFullScreen;
    this.isFullScreen ? (this.sizeModal = '100vw') : (this.sizeModal = 820);
  }
  private watch(): void {
    this.companyService.createCompany$
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (isNil(res)) {
          return;
        }
        if (res.isError) {
          return;
        }

        this.close();
        this.handelSubmit.emit(true);
      });
  }
  onSave(): void {
    const payload = {
      ...this.createForm.value
    }
    this.companyService.create(payload);
  }
}
