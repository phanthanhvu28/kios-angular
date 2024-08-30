import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Injector, Input, Output, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DropdownValue } from '@pages/kios/models';
import ProductDto, { DataFilterProduct } from '@pages/product/models/product.model';
import { ProductService } from '@pages/product/services/product.service';
import { DataFilterStore, DropdownValueCompany } from '@pages/store/models';
import StoreDto from '@pages/store/models/store.model';
import { isNil } from 'ng-zorro-antd/core/util';
import { Observable, takeUntil } from 'rxjs';
import { AbsBaseModalComponent } from 'src/app/abstracts/components/base-modal.components';
import { NvValidators } from 'src/app/utils/validators';

@Component({
  selector: 'app-modal-create-edit-product',
  templateUrl: './modal-create-edit-product.component.html',
  styleUrls: ['./modal-create-edit-product.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalCreateEditProductComponent extends AbsBaseModalComponent {
  sizeModal: number | string = 820;
  isFullScreen: boolean = false;
  @Input() id: string = null;
  @Input() dataDetail: ProductDto;

  @Input() filter: DataFilterProduct;

  storeList: Array<DropdownValue> = [];
  typeSaleList: Array<DropdownValue> = [];
  typeBidaList: Array<DropdownValue> = [];

  createForm: FormGroup;
  @Output() handelSubmit: EventEmitter<boolean> = new EventEmitter<boolean>();
  loading$: Observable<boolean>;
  constructor(
    injector: Injector,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private productService: ProductService
  ) {
    super();
    this.loading$ = this.productService.loading$;
    this.watch();
    //this.loadCommon();
      
  }  
  private watch(): void {
    console.log("watch");
    this.dataDetail = null;
    this.createForm = this.fb.group({
      code:[''],
      storeCode:[''],
      typeSaleCode:[''],
      typeBidaCode:[''],
      name: ['', NvValidators.required],
      store:[''],     
      typeSale:[''],
      typeBida:['']
      
    });

    this.productService.createStore$
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

  ngOnChanges(changes: SimpleChange) {
    const detail = changes['dataDetail'] as ProductDto;
    if(detail){
      console.log("ngOnChanges=>",detail);
      this.initDataForm();
    }    
    this.storeList = this.filter?.store;    
    this.typeBidaList = this.filter?.typeBida;      
    this.typeSaleList = this.filter?.typeSale;      
  } 
  
  protected override initShow(args?: any): void {  
    //this.initForm();
    if (args) {    
      //console.log("initShow",this.filter);     
      //console.log("detail=>",this.dataDetail);
      // this.initDataForm();
    }
  }

  initForm(): void {
    this.createForm = this.fb.group({
      code:[''],    
      name: ['', NvValidators.required],
      typeBida:[''],
      typeSale:[''],
      store:[''],

    });
  }
  initDataForm(): void {
    console.log("initDataForm=>",this.dataDetail);
    if(this.dataDetail !=null){
      this.createForm.patchValue({
        store: {        
          value: this.dataDetail.storeCode,
          label:  this.dataDetail.storeName
        },       
        typeSale: {        
          value: this.dataDetail.typeSaleCode,
          label:  this.dataDetail.typeSaleName
        },
        typeBida: {        
          value: this.dataDetail.typeBidaCode,
          label:  this.dataDetail.typeBidaName
        },
        name: this.dataDetail.name,
        storeCode: this.dataDetail.storeCode,
        typeSaleCode: this.dataDetail.typeSaleCode,
        typeBidaCode: this.dataDetail.typeBidaCode,
      });
    }
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
      this.productService.update(payloadNew);
      console.log("Update",payloadNew);
    }
    else{
      console.log("Create",payload);    
      this.productService.create(payload);
    }
  }
  closeCheckChange() {   
    this.close();
  }
  fullscreenToggle(): void {
    this.isFullScreen = !this.isFullScreen;
    this.isFullScreen ? (this.sizeModal = '100vw') : (this.sizeModal = 820);
  }
  selectStore(value: DropdownValue) {
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
  selectTypeSale(value: DropdownValue) {
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
  selectTypeBida(value: DropdownValue) {
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

  removeAccents(str: string) {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
      .toLocaleLowerCase()
      .trim();
  }
  override ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();   
  }
}
