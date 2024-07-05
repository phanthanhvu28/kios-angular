import { ChangeDetectorRef, Component, EventEmitter, Injector, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DropdownValue } from '@models/base/data.interface';
import { DataFilterStore, DropdownValueCompany } from '@pages/store/models';
import { Observable } from 'rxjs';
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
  // @Input() dataDetail: CompanyRequest;

  @Input() filter: DataFilterStore;

  companyList: Array<DropdownValue> = [];

  createForm: FormGroup;
  @Output() handelSubmit: EventEmitter<boolean> = new EventEmitter<boolean>();
  loading$: Observable<boolean>;
  constructor(
    injector: Injector,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    //private companyService: CompanyService
  ) {
    super();
  //  this.loading$ = this.companyService.loading$;
   // this.watch();
      
  }
  ngOnInit(): void {
 
    console.log("ngOnInit",);
  }
  ngAfterViewInit(): void {
   
    //console.log("ngAfterViewInit",this.filter);
  }
  
  protected override initShow(args?: any): void {
   // console.log("initShow",this.filter?.company);
    this.companyList = this.filter?.company;
    this.initForm();
    if (args) {
    
      //console.log("initShow",this.filter);
   // this.initFormUpload();
    }
  }
  initForm(): void {
    // this.createForm = this.fb.group({
    //   code:[''],
    //   name: ['', NvValidators.required],
    //   address: ['', NvValidators.required],
    //   email:[''],
    //   phone:['']
    // });
  }
  onSave(): void {
    const payload = {
      ...this.createForm.value
    }
    //this.companyService.create(payload);
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
      .get('code')
      .setValue(value.value.code);
    this.createForm.get('name').setValue(value.label);
    this.createForm
      .get('name')
      .setValue(value.value.name);
  }
  onSearchCompany(value: string){
    console.log("onSearchCompany=>",value)
    console.log("this.filter.company=>",this.filter.company)
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
    console.log("result=>",result)
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
 override ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
