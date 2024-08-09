import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NvMessageService } from '@common-components/base-modal-message/services/nv-message.service';
import { ItemOptions } from '@models/base-data-list';
import TypeSaleBaseDto, { DataFilterTypeSale, DeleteTypeSaleRequest } from '@pages/type-sale/models/type-sale.model';
import { TypeSaleService } from '@pages/type-sale/services';
import { take, takeUntil, timer } from 'rxjs';
import { AbsBaseDataListComponent } from 'src/app/abstracts/components/base-data-list.component';
import { Utils } from 'src/app/utils/utils';
import { ModalCreateEditTypeSaleComponent } from '../components/modal-create-edit-type-sale/modal-create-edit-type-sale.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent extends AbsBaseDataListComponent<TypeSaleBaseDto>{
  nvSelections: { [key: string]: Array<ItemOptions> };
  filterSelection: DataFilterTypeSale;
  dataDetail: TypeSaleBaseDto;
  @ViewChild('modalCreateUpdate')
  modalCreateUpdate: ModalCreateEditTypeSaleComponent;

  constructor(
    el: ElementRef,
    private typeSaleService: TypeSaleService,
    private router: Router,
    private route: ActivatedRoute,
    private nvMessageService: NvMessageService,
  ) 
  {
    super(el);  
  }
  ngAfterViewInit(): void {
    timer(100)
      .pipe(take(1))
      .subscribe(() => {
        this.tableHeight = Utils.getTableHeight(this.el.nativeElement);
        Utils.setTableHeight(this.el.nativeElement, this.tableHeight);
      });
  }
  protected override getDataListService(): void {
    this.currentTabService = this.typeSaleService; 
  }
  showUploadModal(): void {   
    this.modalCreateUpdate.show();
    this.loadCommon();
 }
 onFilter(e): void {
   // this.setFilterData(e);
 }
 gotoDetail(id):void{

 }
 onClickEdit(dataRow : TypeSaleBaseDto) : void {
    this.loadCommon();
   // console.log("onClickEdit",dataRow);
    this.dataDetail = dataRow;
    this.modalCreateUpdate.show(dataRow.code);   
 }
 onDelete(code : string) : void {  
   this.nvMessageService.showConfirmMessage(
     {
       title: 'Delete',
       content: `<div class="nv-body-14-regular nv-text-neutral-600">
                 Do you want to delete type sale <strong>‘${code}’?</strong>
               </div>`
     },
     {
       onClickConfirm: () => {
         const payload : DeleteTypeSaleRequest = {
           code:code
         };
         this.typeSaleService.delete(payload);
       }
     }
   );   
 }
 refresh(): void {
   this.getTableData();
 }
 private loadCommon():void{
   this.typeSaleService.getFillerTypeSale().pipe(takeUntil(this.destroy$)).subscribe((res)=>{
     this.filterSelection = res?.data
   });
 }

}
