import { ChangeDetectorRef, Component, inject, Injector, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataListRequestPayload, FilterComparison } from '@models/base-data-list';
import { ResultListModel, ResultModel } from '@models/base/data.interface';
import { AuthService } from '@pages/auth/services/auth.service';
import { InfoUserBaseComponent } from '@pages/kios/common/info-user-base.component';
import { DropdownValue } from '@pages/kios/models';
import PriceBaseDto from '@pages/price/models/price.model';
import { PriceService } from '@pages/price/services/price.service';
import ProductDto from '@pages/product/models/product.model';
import { ProductService } from '@pages/product/services/product.service';
import TableBaseDto, { DataFilterTable } from '@pages/table/models/table.model';
import { UserService } from '@pages/user/services/user.service';
import { isNil } from 'ng-zorro-antd/core/util';
import { catchError, takeUntil, throwError } from 'rxjs';
import { AbsBaseModalComponent } from 'src/app/abstracts/components/base-modal.components';
import { NvValidators } from 'src/app/utils/validators';

@Component({
  selector: 'app-modal-create-edit-order',
  templateUrl: './modal-create-edit-order.component.html',
  styleUrls: ['./modal-create-edit-order.component.less']
})
export class ModalCreateEditOrderComponent extends AbsBaseModalComponent{
 private infoUser: InfoUserBaseComponent;
  formModal: FormGroup;
  @Input() dataDetail: TableBaseDto;
  products: ProductDto[] = [];
  @Input() filter: DataFilterTable;
  constructor(
    injector: Injector,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private userService: UserService,
    private authenService: AuthService,
    private priceService: PriceService,
    private productService: ProductService
  ) {    
      super();
      this.infoUser = new InfoUserBaseComponent(this.authenService);
      this.init();
      this.getCustomerList("");   
  } 
  private init(): void {
    this.formModal = this.fb.group({
      price:['',NvValidators.required],
      fullname:['',NvValidators.required],     
      address: [''],
      productCode: [''],
      email:[''],
      phone:[''],
      storecode:[''],
      product:[],
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
  getCustomerList(searchValue: string = ''): void {
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
      )//ResultListModel<ProductDto>
      .subscribe((res: ResultModel<PriceBaseDto>) => {
        this.formModal.patchValue({
          price: res.data == null ? 0: res.data.unitPrice
        });
      });
  }
  onSearchProduct(value: string){
   this.getCustomerList(value);   
  }
  
  handleCancelModal(): void {
    this.close();    
  }
  handleSave(): void { 
    const payload = {
      ...this.formModal.value
    }
    console.log("handleSave",payload)
  }
}
