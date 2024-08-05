import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NvMessageService } from '@common-components/base-modal-message/services/nv-message.service';
import { ItemOptions } from '@models/base-data-list';
import StaffDto, { DataFilterStaff, DeleteStaffRequest } from '@pages/staff/models/staff.model';
import { StaffService } from '@pages/staff/services/staff.service';
import { take, takeUntil, timer } from 'rxjs';
import { AbsBaseDataListComponent } from 'src/app/abstracts/components/base-data-list.component';
import { Utils } from 'src/app/utils/utils';
import { ModalCreateEditStaffComponent } from '../components/modal-create-edit-staff/modal-create-edit-staff.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent extends AbsBaseDataListComponent<StaffDto>{

  nvSelections: { [key: string]: Array<ItemOptions> };
  filterSelection: DataFilterStaff;
  dataDetail: StaffDto;
  @ViewChild('modalCreateStaff')
  modalCreateStaff: ModalCreateEditStaffComponent;

  constructor(
    el: ElementRef,
    private staffService: StaffService,
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
    this.currentTabService = this.staffService;    
  }

  showUploadModal(): void {   
     this.modalCreateStaff.show();
     this.loadCommon();
  }
  onFilter(e): void {
    // this.setFilterData(e);
  }
  gotoDetail(id):void{

  }
  onClickEdit(dataRow : StaffDto) : void {
     this.loadCommon();
    // console.log("onClickEdit",dataRow);
     this.dataDetail = dataRow;
     this.modalCreateStaff.show(dataRow.code);   
  }
  onDelete(code : string) : void {  
    this.nvMessageService.showConfirmMessage(
      {
        title: 'Delete',
        content: `<div class="nv-body-14-regular nv-text-neutral-600">
                  Do you want to delete staff <strong>‘${code}’?</strong>
                </div>`
      },
      {
        onClickConfirm: () => {
          const payload : DeleteStaffRequest = {
            code:code
          };
          this.staffService.delete(payload);
        }
      }
    );   
  }
  refresh(): void {
    this.getTableData();
  }
  private loadCommon():void{
    this.staffService.getFillerStaff().pipe(takeUntil(this.destroy$)).subscribe((res)=>{
      this.filterSelection = res?.data
    });
  }

  protected override ngOnInit() {
    super.ngOnInit();
  }

}
