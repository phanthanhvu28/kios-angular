import { ChangeDetectorRef, Component, EventEmitter, Injector, Input, OnDestroy, Output, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DropdownValue } from '@models/base/data.interface';
import { UserDto } from '@pages/auth/models';
import { DataFilterUser, DropdownValueStore } from '@pages/user/models';
import { UserService } from '@pages/user/services/user.service';
import { isNil } from 'ng-zorro-antd/core/util';
import { Subject, takeUntil } from 'rxjs';
import { AbsBaseModalComponent } from 'src/app/abstracts/components/base-modal.components';
import { NvValidators } from 'src/app/utils/validators';

@Component({
  selector: 'app-modal-create-edit-user',
  templateUrl: './modal-create-edit-user.component.html',
  styleUrls: ['./modal-create-edit-user.component.less']
})
export class ModalCreateEditUserComponent  implements OnDestroy {  
  private _isVisible: boolean = false;
  @Input() get isVisible(): boolean {
    return this._isVisible;
  }
  set isVisible(newState: boolean) {
    console.log("set isVisible = ", newState)
    this._isVisible = newState;    
  }
 
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
      this.initForm();
  }  
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
  
  handleCancelModal(): void {
    this.onVisibleModal(false);
    this.onCancel.emit();
  }
  handleSave(): void {       
    const payload = {
      ...this.formUser.value      
    }
    this.userService.create(payload);  
    console.log("handleSave",payload);    
  }
  onVisibleModal(value): void {    
    this.isVisible = value   
    this.isVisibleChange.emit(value);
    console.log("onVisibleModal",value)    
  }
  ngOnInit(){
    this.resetForm();
  }
  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
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
    const detail = changes['dataDetail'] as UserDto;
    if(detail){
      console.log("ngOnChanges=>",detail);
     // this.initDataForm();
    }    
    this.storeList = this.filter?.store;    
  } 

  removeAccents(str: string) {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
      .toLocaleLowerCase()
      .trim();
  }
}
