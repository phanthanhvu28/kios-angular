import { ChangeDetectorRef, Component, EventEmitter, Injector, Input, OnDestroy, Output, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DropdownValue } from '@pages/kios/models';

import { DataFilterUser, DropdownValueStore } from '@pages/user/models';
import UserDto from '@pages/user/models/user.model';
import { UserService } from '@pages/user/services/user.service';
import { isNil } from 'ng-zorro-antd/core/util';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';
import { AbsBaseModalComponent } from 'src/app/abstracts/components/base-modal.components';
import { NvValidators } from 'src/app/utils/validators';

@Component({
  selector: 'app-modal-create-edit-user',
  templateUrl: './modal-create-edit-user.component.html',
  styleUrls: ['./modal-create-edit-user.component.less']
})
export class ModalCreateEditUserComponent  extends AbsBaseModalComponent {  
  private _isVisible: boolean = false;
  @Input() get isVisible(): boolean {
    return this._isVisible;
  }
  set isVisible(newState: boolean) {
    console.log("set isVisible = ", newState)
    this._isVisible = newState;    
  }
  disableControl:boolean=false;
 
  private _destroy$ = new Subject<void>();
  @Input() filter: DataFilterUser;
  @Output() isVisibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onCancel = new EventEmitter();
  @Output() handelSubmit = new EventEmitter();

  formUser: FormGroup;

  storeList: Array<DropdownValue> = [];
  @Input() id: string = null;
  @Input() dataDetail: UserDto;

  constructor(
    injector: Injector,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private userService: UserService
  ) {    
    super();
   
      this.initForm();
  }  
  // public isActive: boolean;
  // public size: string | number;
  protected override initShow(args?: any): void {
    
  }
  // show(args?: any): void {
  //   throw new Error('Method not implemented.');
  // }
  // close(): void {
  //   throw new Error('Method not implemented.');
  // }
  private resetForm(): void {
    this.formUser = this.fb.group({
      username:['',NvValidators.required],
      fullname:['',NvValidators.required],     
      address: [''],
      email:[''],
      phone:[''],
      storecode:[''],
      store:[]
    });
  }
  private initForm(): void {
    this.formUser = this.fb.group({
      username:['',NvValidators.required],
      fullname:['',NvValidators.required],     
      address: [''],
      email:[''],
      phone:[''],
      storecode:[''],
      store:[]
    });
    
    this.userService.createUse$
      .pipe(takeUntil(this._destroy$))
      .subscribe((res) => {
        if (isNil(res)) {
          return;
        }
        if (res.isError) {
          return;
        }

        this.onVisibleModal(false);
        this.resetForm();
        this.handelSubmit.emit(true);
      });
  }

  initDataForm(): void {
    console.log("initDataForm=>",this.dataDetail);
    this.disableControl == (this.dataDetail != null ? true: false);
    if(this.dataDetail !=null){
      this.formUser.patchValue({     
        username: this.dataDetail.username,
        fullname: this.dataDetail.fullname,
        email: this.dataDetail.email,
        address: this.dataDetail.address,
        phone: this.dataDetail.phone,
        store: {        
          value: this.dataDetail.storeCode,
          label:  this.dataDetail.storeName
        },
      
      });
    }
  }
  
  handleCancelModal(): void {
    this.close();
    // this.onVisibleModal(false);
    // this.onCancel.emit();
  }
  handleSave(): void {       
    const payload = {
      ...this.formUser.value      
    }
    if(this.dataDetail?.username){    
      this.userService.update(payload);  
    }
    else{
      this.userService.create(payload);  
    }
    console.log("handleSave",payload);    


  }
  onVisibleModal(value): void {    
    this.close();
    // this.isVisible = value   
    //this.isVisibleChange.emit(value);
    // console.log("onVisibleModal",value)    
  }
  ngOnInit(){
    this.resetForm();
  }

  selectCompany(value: DropdownValueStore) {
    this.formUser
      .get('storecode')
      .setValue(value.value.code);   
  }
  onSearchCompany(value: string){
   
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
  ngOnChanges(changes: SimpleChange) {
    this.initDataForm();   
    this.storeList = this.filter?.store;    
  } 
}
