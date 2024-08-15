import { ChangeDetectorRef, Component, EventEmitter, Injector, Input, Output, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import UserDto from '@pages/user/models/user.model';
import { UserService } from '@pages/user/services/user.service';
import { isNil } from 'ng-zorro-antd/core/util';
import { Subject, takeUntil } from 'rxjs';
import { AbsBaseModalComponent } from 'src/app/abstracts/components/base-modal.components';
import { NvValidators } from 'src/app/utils/validators';

@Component({
  selector: 'app-modal-reset-pass',
  templateUrl: './modal-reset-pass.component.html',
  styleUrls: ['./modal-reset-pass.component.less']
})
export class ModalResetPassComponent extends AbsBaseModalComponent {

  @Output() isVisibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onCancel = new EventEmitter();
  @Output() handelSubmit = new EventEmitter();

  @Input() dataDetail: UserDto;

  formUser: FormGroup;
  private _destroy$ = new Subject<void>();

  constructor(
    injector: Injector,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private userService: UserService
  ) {    
    super();
    this.initForm();
     
  } 
  
  protected override initShow(args?: any): void {
    //this.init();
    // throw new Error('Method not implemented.');
  }

  ngOnChanges(changes: SimpleChange) {
    this.initDataForm();   
  } 
  private init(): void {
    this.formUser = this.fb.group({
      username:['',NvValidators.required],
      password: [''],
      confirmedPass:['']     
    });  
  }

  initDataForm(): void {   
    if(this.dataDetail !=null){
      this.formUser.patchValue({     
        username: this.dataDetail.username      
      });
    }
  }
  
  private initForm(): void {
    this.formUser = this.fb.group({
      username:[{value: ''},NvValidators.required],
      password: [''],
      confirmedPass:['']     
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

        // this.resetForm();
        this.close()
        this.handelSubmit.emit(true);
      });
  }

  handleSave():void{
    const payload = {
      ...this.formUser.value      
    }
    if(this.dataDetail?.username){    
      this.userService.resetPass(payload);  
    }
  }

  onCloseModal(value): void {   
    this.close();     
  }
}
