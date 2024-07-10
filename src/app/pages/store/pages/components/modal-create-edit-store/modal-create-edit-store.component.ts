import { ChangeDetectorRef, Component, EventEmitter, Injector, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DropdownValue } from '@models/base/data.interface';
import { DataFilterStore, DropdownValueCompany } from '@pages/store/models';
import StoreDto from '@pages/store/models/store.model';
import { StoreService } from '@pages/store/services/store.service';
import { isNil } from 'ng-zorro-antd/core/util';
import { Observable, takeUntil } from 'rxjs';
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
  @Input() dataDetail: StoreDto;

  @Input() filter: DataFilterStore;

  companyList: Array<DropdownValue> = [];

  createForm: FormGroup;
  @Output() handelSubmit: EventEmitter<boolean> = new EventEmitter<boolean>();
  loading$: Observable<boolean>;
  constructor(
    injector: Injector,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private storeService: StoreService
  ) {
    super();
    this.loading$ = this.storeService.loading$;
    this.watch();
      
  }  
  private watch(): void {
    this.createForm = this.fb.group({
      code:[''],
      companyCode:[''],
      name: ['', NvValidators.required],
      address: ['', NvValidators.required],
      email:[''],
      phone:[''],
      company:['']
    });

    this.storeService.createStore$
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

  ngOnChanges() {
    this.companyList = this.filter?.company;   
    console.log("detail=>",this.dataDetail);
  }
  
  protected override initShow(args?: any): void {  
    this.initForm();
    if (args) {    
      //console.log("initShow",this.filter);
      // this.initFormUpload();
      console.log("detail=>",this.dataDetail);
    }
  }
  initForm(): void {
    this.createForm = this.fb.group({
      code:[''],
      companyCode:[''],
      name: ['', NvValidators.required],
      address: ['', NvValidators.required],
      email:[''],
      phone:[''],
      company:['']
    });
  }
  onSave(): void {
    const payload = {
      ...this.createForm.value
    }
    console.log("onSave",payload);    
    this.storeService.create(payload);

  }
  closeCheckChange() {   
    this.close();
  }
  fullscreenToggle(): void {
    this.isFullScreen = !this.isFullScreen;
    this.isFullScreen ? (this.sizeModal = '100vw') : (this.sizeModal = 820);
  }
  selectCompany(value: DropdownValueCompany) {
    this.createForm
      .get('companyCode')
      .setValue(value.value.code);
    // this.createForm.get('name').setValue(value.label);
    // this.createForm
    //   .get('name')
    //   .setValue(value.value.name);
  }
  onSearchCompany(value: string){
   
    const result = this.filter.company.filter((item) => {
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
    this.companyList = structuredClone(result);    
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
