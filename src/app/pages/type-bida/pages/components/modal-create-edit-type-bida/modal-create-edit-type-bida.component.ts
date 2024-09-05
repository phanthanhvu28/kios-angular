import { ChangeDetectorRef, Component, EventEmitter, Injector, Input, Output, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DropdownValue } from '@pages/kios/models';
import TypeBidaBaseDto, { DataFilterTypeBida } from '@pages/type-bida/models/type-bida.model';
import { TypeBidaService } from '@pages/type-bida/services';
import { DropdownValueStore } from '@pages/type-sale/models/type-sale.model';
import { isNil } from 'ng-zorro-antd/core/util';
import { Observable, takeUntil } from 'rxjs';
import { AbsBaseModalComponent } from 'src/app/abstracts/components/base-modal.components';
import { NvValidators } from 'src/app/utils/validators';

@Component({
  selector: 'app-modal-create-edit-type-bida',
  templateUrl: './modal-create-edit-type-bida.component.html',
  styleUrls: ['./modal-create-edit-type-bida.component.less']
})
export class ModalCreateEditTypeBidaComponent extends AbsBaseModalComponent {
  sizeModal: number | string = 820;
  isFullScreen: boolean = false;
  @Input() id: string = null;
  @Input() dataDetail: TypeBidaBaseDto;

  @Input() filter: DataFilterTypeBida;
  
  storeList: Array<DropdownValue> = [];

  createForm: FormGroup;
  @Output() handelSubmit: EventEmitter<boolean> = new EventEmitter<boolean>();
  loading$: Observable<boolean>;
  protected override initShow(args?: any): void {
  }

  constructor(
    injector: Injector,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private typeBidaService: TypeBidaService
  ) {
    super();
    this.loading$ = this.typeBidaService.loading$;
    this.watch();
    //this.loadCommon();
      
  } 
  private watch(): void {
    console.log("watch");
    this.dataDetail = null;
    this.createForm = this.fb.group({
      store:[''],
      code:[''],
      storeCode:[''],
      name: ['', NvValidators.required],
      staffCode:[''],
    });

    this.typeBidaService.entityObservable$
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
    this.storeList = structuredClone(result);    
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
      this.typeBidaService.update(payloadNew);
    }
    else{
      this.typeBidaService.create(payload);
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
        storeCode: this.dataDetail.storeCode,
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
