import { ChangeDetectorRef, Component, EventEmitter, Injector, Input, Output, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DropdownValue } from '@pages/kios/models';
import StaffDto, { DataFilterStaff } from '@pages/staff/models/staff.model';
import { StaffService } from '@pages/staff/services/staff.service';
import { DropdownValueStore } from '@pages/user/models';
import { isNil } from 'ng-zorro-antd/core/util';
import { Observable, takeUntil } from 'rxjs';
import { AbsBaseModalComponent } from 'src/app/abstracts/components/base-modal.components';
import { NvValidators } from 'src/app/utils/validators';

@Component({
  selector: 'app-modal-create-edit-staff',
  templateUrl: './modal-create-edit-staff.component.html',
  styleUrls: ['./modal-create-edit-staff.component.less']
})
export class ModalCreateEditStaffComponent extends AbsBaseModalComponent {
  sizeModal: number | string = 820;
  isFullScreen: boolean = false;
  @Input() id: string = null;
  @Input() dataDetail: StaffDto;

  @Input() filter: DataFilterStaff;
  
  storeList: Array<DropdownValue> = [];

  createForm: FormGroup;
  @Output() handelSubmit: EventEmitter<boolean> = new EventEmitter<boolean>();
  loading$: Observable<boolean>;

  constructor(
    injector: Injector,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private staffService: StaffService
  ) {
    super();
    this.loading$ = this.staffService.loading$;
    this.watch();
    //this.loadCommon();
      
  } 
  private watch(): void {
    console.log("watch");
    this.dataDetail = null;
    this.createForm = this.fb.group({
      code:[''],
      storeCode:[''],
      fullName: ['', NvValidators.required],
      address: ['', NvValidators.required],
      email:[''],
      phone:[''],
      store:['']
    });

    this.staffService.createStaff$
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
  
  protected override initShow(args?: any): void {
    
  }
  closeCheckChange() {   
    this.close();
  }
  selectStore(value: DropdownValueStore) {
    this.createForm
      .get('storeCode')
      .setValue(value.value.code);
    // this.createForm.get('name').setValue(value.label);
    // this.createForm
    //   .get('name')
    //   .setValue(value.value.name);
  }
  onSearchStore(value: string){
   
    const result = this.filter.store.filter((item) => {
      return (
        Object.keys(item.value)
          .map((key) =>
            this.removeAccents(item.value[key]).includes(
              this.removeAccents(value)
            )
          )
          .some((res) => res) ||
        this.removeAccents(item.label).includes(this.removeAccents(value))
      );
    });
    console.log("resultData=>",result)
    this.storeList = structuredClone(result);    
  }

  fullscreenToggle(): void {
    this.isFullScreen = !this.isFullScreen;
    this.isFullScreen ? (this.sizeModal = '100vw') : (this.sizeModal = 820);
  }
  onSave(): void {
    const payload = {
      ...this.createForm.value
    }
    if(this.dataDetail?.code){    
      var payloadNew ={
        ...payload,
        code: this.dataDetail.code
      }  
      this.staffService.update(payloadNew);
      console.log("Update",payloadNew);
    }
    else{
      console.log("Create",payload);    
      this.staffService.create(payload);
    }
  }
  initDataForm(): void {
    console.log("initDataForm=>",this.dataDetail);
    if(this.dataDetail != null){
      this.createForm.patchValue({
        store: {        
          value: this.dataDetail.storeCode,
          label:  this.dataDetail.storeName
        },
        fullName: this.dataDetail.fullName,
        address: this.dataDetail.address,
        email: this.dataDetail.email,
        phone: this.dataDetail.phone,
      });
    }
  }
  ngOnChanges(changes: SimpleChange) {
    console.log("ngOnChanges",this.filter)
    this.initDataForm();   
    this.storeList = this.filter?.store;    
  }
}
