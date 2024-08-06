import { ChangeDetectorRef, Component, EventEmitter, Injector, Input, Output, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DropdownValue } from '@models/base/data.interface';
import { DataFilterArea } from '@pages/area/models';
import AreaDto from '@pages/area/models/area.model';
import { AreaService } from '@pages/area/services/area.service';
import { DropdownValueStore } from '@pages/user/models/user.model';
import { isNil } from 'ng-zorro-antd/core/util';
import { Observable, takeUntil } from 'rxjs';
import { AbsBaseModalComponent } from 'src/app/abstracts/components/base-modal.components';
import { NvValidators } from 'src/app/utils/validators';

@Component({
  selector: 'app-modal-create-edit-area',
  templateUrl: './modal-create-edit-area.component.html',
  styleUrls: ['./modal-create-edit-area.component.less']
})
export class ModalCreateEditAreaComponent extends AbsBaseModalComponent{
  sizeModal: number | string = 820;
  isFullScreen: boolean = false;
  @Input() id: string = null;
  @Input() dataDetail: AreaDto;

  @Input() filter: DataFilterArea;
  
  storeList: Array<DropdownValue> = [];

  createForm: FormGroup;
  @Output() handelSubmit: EventEmitter<boolean> = new EventEmitter<boolean>();
  loading$: Observable<boolean>;

  constructor(
    injector: Injector,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private areaService: AreaService
  ) {
    super();
    this.loading$ = this.areaService.loading$;
    this.watch();
    //this.loadCommon();
      
  } 
  protected override initShow(args?: any): void {
  }

  private watch(): void {
    console.log("watch");
    this.dataDetail = null;
    this.createForm = this.fb.group({
      code:[''],
      storeCode:[''],
      staffCode:[''],
      name: ['', NvValidators.required],
      address: ['', NvValidators.required],
      email:[''],
      phone:[''],
      store:['']
    });

    this.areaService.createArea$
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
  removeAccents(str: string) {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
      .toLocaleLowerCase()
      .trim();
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
      this.areaService.update(payloadNew);
      console.log("Update",payloadNew);
    }
    else{
      console.log("Create",payload);    
      this.areaService.create(payload);
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
        name: this.dataDetail.name,
        address: this.dataDetail.address,
        email: this.dataDetail.email,
        phone: this.dataDetail.phone,
        staffCode: this.dataDetail.staffCode,
      });
    }
  }
  ngOnChanges(changes: SimpleChange) {
    console.log("ngOnChanges",this.filter)
    this.initDataForm();   
    this.storeList = this.filter?.store;    
  }

}
