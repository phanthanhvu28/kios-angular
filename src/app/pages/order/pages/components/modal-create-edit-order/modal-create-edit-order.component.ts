import { ChangeDetectorRef, Component, Injector } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '@pages/user/services/user.service';
import { isNil } from 'ng-zorro-antd/core/util';
import { takeUntil } from 'rxjs';
import { AbsBaseModalComponent } from 'src/app/abstracts/components/base-modal.components';
import { NvValidators } from 'src/app/utils/validators';

@Component({
  selector: 'app-modal-create-edit-order',
  templateUrl: './modal-create-edit-order.component.html',
  styleUrls: ['./modal-create-edit-order.component.less']
})
export class ModalCreateEditOrderComponent  extends AbsBaseModalComponent{
  formModal: FormGroup;
  constructor(
    injector: Injector,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private userService: UserService
  ) {    
      super();
      this.init();
  } 
  private init(): void {
    this.formModal = this.fb.group({
      username:['',NvValidators.required],
      fullname:['',NvValidators.required],     
      address: [''],
      email:[''],
      phone:[''],
      storecode:[''],
      store:[],
      roles:[],
      searchValue:['']
    });       
    this.userService.createUse$
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (isNil(res)) {
          return;
        }
        if (res.isError) {
          return;
        }

        this.close();
        //this.handelSubmit.emit(true);
      });
  }
  
  protected override initShow(args?: any): void {
  }


  handleCancelModal(): void {
    this.close();    
  }
  handleSave(): void { 
  }
}
