import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NvMessageService } from '@common-components/base-modal-message/services/nv-message.service';
import { ItemOptions } from '@models/base-data-list';
import TableBaseDto, { DataFilterTable, DeleteTableRequest } from '@pages/table/models/table.model';
import { TableService } from '@pages/table/services';
import { AbsBaseDataListComponent } from 'src/app/abstracts/components/base-data-list.component';
import { ModalCreateEditTableComponent } from '../components/modal-create-edit-table/modal-create-edit-table.component';
import { take, takeUntil, timer } from 'rxjs';
import { Utils } from 'src/app/utils/utils';
import { AuthService } from '@pages/auth/services/auth.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent extends AbsBaseDataListComponent<TableBaseDto>{
  nvSelections: { [key: string]: Array<ItemOptions> };
  filterSelection: DataFilterTable;
  dataDetail: TableBaseDto;
  @ViewChild('modalCreateUpdate')
  modalCreateUpdate: ModalCreateEditTableComponent;

  constructor(
    el: ElementRef,
    private tableService: TableService,
    private router: Router,
    private route: ActivatedRoute,
    private nvMessageService: NvMessageService,
    private authService: AuthService
  ) 
  {
    super(el);  
    console.log("Token", this.authService.getCurrentUserParse())
    console.log("Menus", this.authService.getMenus())
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
    this.currentTabService = this.tableService;    
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
 onClickEdit(dataRow : TableBaseDto) : void {
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
                 Do you want to delete table <strong>‘${code}’?</strong>
               </div>`
     },
     {
       onClickConfirm: () => {
         const payload : DeleteTableRequest = {
           code:code
         };
         this.tableService.delete(payload);
       }
     }
   );   
 }
 refresh(): void {
   this.getTableData();
 }
 private loadCommon():void{
   this.tableService.getFillerStaff().pipe(takeUntil(this.destroy$)).subscribe((res)=>{
     this.filterSelection = res?.data
   });
 }

}
