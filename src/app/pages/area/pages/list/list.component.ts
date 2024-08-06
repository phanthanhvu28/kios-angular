import { Component, ElementRef, ViewChild } from '@angular/core';
import { ItemOptions } from '@models/base-data-list';
import AreaDto, { DataFilterArea, DeleteAreaRequest } from '@pages/area/models/area.model';
import { AbsBaseDataListComponent } from 'src/app/abstracts/components/base-data-list.component';
import { ModalCreateEditAreaComponent } from '../components/modal-create-edit-area/modal-create-edit-area.component';
import { ActivatedRoute, Router } from '@angular/router';
import { NvMessageService } from '@common-components/base-modal-message/services/nv-message.service';
import { AreaService } from '@pages/area/services/area.service';
import { take, takeUntil, timer } from 'rxjs';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent extends AbsBaseDataListComponent<AreaDto>{
  nvSelections: { [key: string]: Array<ItemOptions> };
  filterSelection: DataFilterArea;
  dataDetail: AreaDto;
  @ViewChild('modalCreateArea')
  modalCreateArea: ModalCreateEditAreaComponent;

  constructor(
    el: ElementRef,
    private areaService: AreaService,
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
    this.currentTabService = this.areaService;    
  }
  showUploadModal(): void {   
    this.modalCreateArea.show();
    this.loadCommon();
 }
 onFilter(e): void {
   // this.setFilterData(e);
 }
 gotoDetail(id):void{

 }
 onClickEdit(dataRow : AreaDto) : void {
    this.loadCommon();
   // console.log("onClickEdit",dataRow);
    this.dataDetail = dataRow;
    this.modalCreateArea.show(dataRow.code);   
 }
 onDelete(code : string) : void {  
   this.nvMessageService.showConfirmMessage(
     {
       title: 'Delete',
       content: `<div class="nv-body-14-regular nv-text-neutral-600">
                 Do you want to delete area <strong>‘${code}’?</strong>
               </div>`
     },
     {
       onClickConfirm: () => {
         const payload : DeleteAreaRequest = {
           code:code
         };
         this.areaService.delete(payload);
       }
     }
   );   
 }
 refresh(): void {
   this.getTableData();
 }
 private loadCommon():void{
   this.areaService.getFillerStaff().pipe(takeUntil(this.destroy$)).subscribe((res)=>{
     this.filterSelection = res?.data
   });
 }

 protected override ngOnInit() {
  super.ngOnInit();
}

}
