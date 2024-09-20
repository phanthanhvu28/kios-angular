import { ChangeDetectorRef, Component, EventEmitter, inject, Injector, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataListRequestPayload, FilterComparison } from '@models/base-data-list';
import { ResultListModel, ResultModel } from '@models/base/data.interface';
import { AuthService } from '@pages/auth/services/auth.service';
import { InfoUserBaseComponent } from '@pages/kios/common/info-user-base.component';
import { DropdownValue } from '@pages/kios/models';
import { OrderDetailModel } from '@pages/order/models';
import { OrderListService } from '@pages/order/services';
import { OrderService } from '@pages/order/services/order.service';
import PriceBaseDto from '@pages/price/models/price.model';
import { PriceService } from '@pages/price/services/price.service';
import ProductDto from '@pages/product/models/product.model';
import { ProductService } from '@pages/product/services/product.service';
import TableBaseDto, { DataFilterTable } from '@pages/table/models/table.model';
import { TableService } from '@pages/table/services';
import { UserService } from '@pages/user/services/user.service';
import { isNil } from 'ng-zorro-antd/core/util';
import { catchError, takeUntil, throwError } from 'rxjs';
import { AbsBaseModalComponent } from 'src/app/abstracts/components/base-modal.components';
import { NvValidators } from 'src/app/utils/validators';

@Component({
  selector: 'app-modal-create-edit-order',
  templateUrl: './modal-create-edit-order.component.html',
  styleUrls: ['./modal-create-edit-order.component.less'],
  providers: [OrderService]

})
export class ModalCreateEditOrderComponent extends AbsBaseModalComponent{
  @Output() isVisibleModal: EventEmitter<boolean> =
  new EventEmitter<boolean>();
  @Output() onCancel = new EventEmitter();

  private _isVisibleModalOrder: boolean = false;
  @Input() get isVisibleModalOrder(): boolean {
    return this._isVisibleModalOrder;
  }
  set isVisibleModalOrder(newState: boolean) {
    console.log("isVisibleModalOrder", newState)
    this._isVisibleModalOrder = newState;   
  }

 private infoUser: InfoUserBaseComponent;
  formModal: FormGroup;
  @Input() dataDetail: TableBaseDto;
  products: ProductDto[] = [];
  isProductSelected = false; // To track whether a product is selected
  storeCode: string=''
  totalAmount : number = 0;
  @Input() filter: DataFilterTable;
  constructor(
    injector: Injector,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private userService: UserService,
    private authenService: AuthService,
    private priceService: PriceService,
    private productService: ProductService,
    private orderService: OrderService,
    private tableService: TableService,
    authService: AuthService,
    private orderListService: OrderListService,
  ) {    
      super();
      this.storeCode = authService.getCurrentUserParse().storecode
      this.infoUser = new InfoUserBaseComponent(this.authenService);
      this.init();
      this.getProductList("");  
      this.setTotalAmount();
         
  } 
  private init(): void {
    this.formModal = this.fb.group({
      price:['',NvValidators.required],
      staffCode:['',NvValidators.required],  
      productCode: [''],    
      quantity:[0],
      amount:[0],
      product:[],
      tableCode:['']
    });       
    this.orderService.createOrder$
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (isNil(res)) {
          return;
        }
        if (res.isError) {
          return;
        }

        //this.close();
        //this.handelSubmit.emit(true);
      });
     
  }
  getProductList(searchValue: string = ''): void {
    const search = {
      fieldName: 'code||name',
      comparison: FilterComparison.Contains,
      fieldValue: searchValue
    };
    const payload : DataListRequestPayload = {
       page:1,
       pageSize:20,
       filters:[search]
    };
   
    this.productService
      .getList(payload)
      .pipe(
        takeUntil(this.destroy$),
        catchError((error) => {
          return throwError(() => error);
        })
      )
      .subscribe((res: ResultListModel<ProductDto>) => {
        this.products = res.items;
      });
  }
  
  protected override initShow(args?: any): void {
  }

  selectProduct(value: ProductDto) {

    this.formModal
      .get('productCode')
      .setValue(value.code);  
      this.priceService.getPriceByProduct(this.infoUser.storeCode,value.code).pipe(
        takeUntil(this.destroy$),
        catchError((error) => {
          return throwError(() => error);
        })
      )
      .subscribe((res: ResultModel<PriceBaseDto>) => {
              this.formModal.patchValue({
          price: res.data == null ? 0: res.data.unitPrice
        });
      });
      this.isProductSelected = !!value; 
      this.onQuantityFocusOutEvent();
  }
  onSearchProduct(value: string){
   this.getProductList(value);   
  }

  handleVisibleModal(value): void { 
    this.handleAfterClose();
    this.close();    
    //this.isVisibleModal.emit(value);    
  }

  onClickCancelModal(): void {
  
    // this.handleVisibleModal(false);
    // this.onCancel.emit();
    this.handleAfterClose();
    this.close();
  }

  handleAfterClose(): void {    
    this.tableService.getTableByStore(this.storeCode);  
  }
  setTotalAmount():void{
     this.orderListService.totalOrder$.subscribe(sub =>{
      console.log("setTotalAmount=",sub)
      this.totalAmount = sub
     })
  }
  onQuantityFocusOutEvent(): void {
    const { productCode, price, quantity } = this.formModal.value; 
    this.formModal
      .get('amount')
      .setValue(price*quantity);  
  }
  handleSave(): void { 

    const { productCode, price, quantity } = this.formModal.value;
    const orderCode = this.dataDetail.order?.orderCode || "";
    const orderDetail : OrderDetailModel = { 
      productCode : productCode,
      quantity : quantity,
      unitPrice: price
    }
    const payload = {
      ...this.formModal.value,
      orderCode,
      orderDetail,
      storeCode : this.infoUser.storeCode,
      tableCode : this.dataDetail.code
    }
    console.log("handleSave",payload)
    this.orderService.create(payload);
  }

  override ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();   
  }
}
