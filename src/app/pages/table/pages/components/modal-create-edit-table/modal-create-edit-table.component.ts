import { ChangeDetectorRef, Component, EventEmitter, Injector, Input, Output, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DropdownValue } from '@pages/kios/models';
import TableBaseDto, { DataFilterTable } from '@pages/table/models/table.model';
import { TableService } from '@pages/table/services';
import { DropdownValueStore } from '@pages/user/models';
import { isNil } from 'ng-zorro-antd/core/util';
import { Observable, takeUntil } from 'rxjs';
import { AbsBaseModalComponent } from 'src/app/abstracts/components/base-modal.components';
import { NvValidators } from 'src/app/utils/validators';

@Component({
  selector: 'app-modal-create-edit-table',
  templateUrl: './modal-create-edit-table.component.html',
  styleUrls: ['./modal-create-edit-table.component.less']
})
export class ModalCreateEditTableComponent extends AbsBaseModalComponent{
  sizeModal: number | string = 820;
  isFullScreen: boolean = false;
  @Input() id: string = null;
  @Input() dataDetail: TableBaseDto;

  @Input() filter: DataFilterTable;
  
  storeList: Array<DropdownValue> = [];
  areaList: Array<DropdownValue> = [];
  typeSaleList: Array<DropdownValue> = [];
  typeBidaList: Array<DropdownValue> = [];

  createForm: FormGroup;
  @Output() handelSubmit: EventEmitter<boolean> = new EventEmitter<boolean>();
  loading$: Observable<boolean>;

  constructor(
    injector: Injector,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private tableService: TableService
  ) {
    super();
    this.loading$ = this.tableService.loading$;
    this.watch();
      
  } 
  protected override initShow(args?: any): void {
  }
  private watch(): void {
    console.log("watch");
    this.dataDetail = null;
    this.createForm = this.fb.group({
      code:[''],
      storeCode:[''],
      areaCode:[''],
      typeSaleCode:[''],
      typeBidaCode:[''],
      staffCode:[''],
      name: ['', NvValidators.required],
      address: ['', NvValidators.required],
      email:[''],
      phone:[''],
      store:[''],
      area:[''],
      typeSale:[''],
      typeBida:['']
    });

    this.tableService.entityObservable$
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
  initDataForm(): void {
    console.log("initDataForm=>",this.dataDetail);
    if(this.dataDetail != null){
      this.createForm.patchValue({
        store: {        
          value: this.dataDetail.storeCode,
          label:  this.dataDetail.storeName
        },
        area: {        
          value: this.dataDetail.areaCode,
          label:  this.dataDetail.areaName
        },
        typeSale: {        
          value: this.dataDetail.typeSaleCode,
          label:  this.dataDetail.typeSaleName
        },
        typeBida: {        
          value: this.dataDetail.typeBidaCode,
          label:  this.dataDetail.typeBidaName
        },
        storeCode: this.dataDetail.storeCode,
        areaCode: this.dataDetail.areaCode,
        typeSaleCode: this.dataDetail.typeSaleCode,
        typeBidaCode: this.dataDetail.typeBidaCode,
        name: this.dataDetail.name,
        address: this.dataDetail.address,
        email: this.dataDetail.email,
        phone: this.dataDetail.phone,
        staffCode: this.dataDetail.staffCode,
      });
    }
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
  selectArea(value: DropdownValueStore) {
    this.createForm
      .get('areaCode')
      .setValue(value.value.code);  
  }
  onSearchArea(value: string){
   
    const result = this.filter.area.filter((item) => {
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
    this.areaList = structuredClone(result);    
  }
  selectTypeSale(value: DropdownValueStore) {
    this.createForm
      .get('typeSaleCode')
      .setValue(value.value.code);  
  }
  onSearchTypeSale(value: string){
   
    const result = this.filter.typeSale.filter((item) => {
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
    this.typeSaleList = structuredClone(result);    
  }
  selectTypeBida(value: DropdownValueStore) {
    this.createForm
      .get('typeBidaCode')
      .setValue(value.value.code);  
  }
  onSearchTypeBida(value: string){
   
    const result = this.filter.typeBida.filter((item) => {
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
    this.typeBidaList = structuredClone(result);    
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
      this.tableService.update(payloadNew);
      console.log("Update",payloadNew);
    }
    else{
      console.log("Create",payload);    
      this.tableService.create(payload);
    }
  }
  ngOnChanges(changes: SimpleChange) {
    console.log("ngOnChanges",this.filter)
    this.initDataForm();   
    this.storeList = this.filter?.store;    
    this.areaList = this.filter?.area;    
    this.typeSaleList = this.filter?.typeSale;    
    this.typeBidaList = this.filter?.typeBida;    
  }
}
