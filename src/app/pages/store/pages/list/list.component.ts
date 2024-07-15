import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemOptions } from '@models/base-data-list';
import StoreDto, { DataFilterStore, DeleteStoreRequest } from '@pages/store/models/store.model';
import { StoreService } from '@pages/store/services/store.service';
import { take, takeUntil, timer } from 'rxjs';
import { AbsBaseDataListComponent } from 'src/app/abstracts/components/base-data-list.component';
import { Utils } from 'src/app/utils/utils';
import { ModalCreateEditStoreComponent } from '../components/modal-create-edit-store/modal-create-edit-store.component';
import { NotificationService } from 'src/app/notification/notification.service';
import { NvMessageService } from '@common-components/base-modal-message/services/nv-message.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less'],
  providers: [StoreService]
})
export class ListComponent extends AbsBaseDataListComponent<StoreDto>{
  nvSelections: { [key: string]: Array<ItemOptions> };
  filterSelection: DataFilterStore;
  @ViewChild('modalCreateStore')
  modalCreateStore: ModalCreateEditStoreComponent;

  dataDetail: StoreDto;
  constructor(
    el: ElementRef,
    private storeService: StoreService,
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
  protected override ngOnInit() {
    super.ngOnInit();
  }

  
  protected override getDataListService(): void {
    this.currentTabService = this.storeService;    
  }

  showUploadModal(): void {   
    this.modalCreateStore.show();
    this.loadCommon();
  }
  gotoDetail(id):void{

  }
  onFilter(e): void {
    this.setFilterData(e);
  }
  refresh(): void {
    this.getTableData();
  }
  onClickEdit(dataRow : StoreDto) : void {
    this.loadCommon();
    console.log("onClickEdit",dataRow);
    this.dataDetail = dataRow;
    this.modalCreateStore.show(dataRow.code);   
  }

  onDelete(code : string) : void {  
    this.nvMessageService.showConfirmMessage(
      {
        title: 'Delete',
        content: `<div class="nv-body-14-regular nv-text-neutral-600">
                  Do you want to delete store <strong>‘${code}’?</strong>
                </div>`
      },
      {
        onClickConfirm: () => {
          const payload : DeleteStoreRequest = {
            code:code
          };
          this.storeService.delete(payload);
        }
      }
    );   
  }

  private loadCommon():void{
    this.storeService.getFillerCompany().pipe(takeUntil(this.destroy$)).subscribe((res)=>{
      this.filterSelection = res?.data
    });
  }

}
