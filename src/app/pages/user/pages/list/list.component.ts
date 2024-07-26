import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NvMessageService } from '@common-components/base-modal-message/services/nv-message.service';
import { ItemOptions } from '@models/base-data-list';
import UserDto, { DataFilterUser, DeleteUserRequest } from '@pages/user/models/user.model';
import { UserService } from '@pages/user/services/user.service';
import { take, takeUntil, timer } from 'rxjs';
import { AbsBaseDataListComponent } from 'src/app/abstracts/components/base-data-list.component';
import { Utils } from 'src/app/utils/utils';
import { ModalCreateEditUserComponent } from '../components/modal-create-edit-user/modal-create-edit-user.component';
import { ModalCreateEditMenuComponent } from '../components/modal-create-edit-menu/modal-create-edit-menu.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent extends AbsBaseDataListComponent<UserDto>{

  nvSelections: { [key: string]: Array<ItemOptions> };
  filterSelection: DataFilterUser;

  isVisible = false

  dataDetail: UserDto;

  @ViewChild('modalCreateUser')
  modalCreateUser: ModalCreateEditUserComponent;

  @ViewChild('modalCreateMenu')
  modalCreateMenu: ModalCreateEditMenuComponent;
  
  constructor(
    el: ElementRef,
    private userService: UserService,
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
    this.currentTabService = this.userService;    
  }

  onFilter(e): void {
    this.setFilterData(e);
  }
  refresh(): void {
    this.getTableData();
  }
  showUploadModal(): void {   
    this.modalCreateUser.isVisible = true;
    this.loadCommon();
    console.log("showUploadModal=", this.isVisible)
  }

  private loadCommon():void{
    this.userService.getFillerUser().pipe(takeUntil(this.destroy$)).subscribe((res)=>{
      this.filterSelection = res?.data
    });
  }

  onDelete(username : string) : void {  
    this.nvMessageService.showConfirmMessage(
      {
        title: 'Delete',
        content: `<div class="nv-body-14-regular nv-text-neutral-600">
                  Do you want to delete username <strong>‘${username}’?</strong>
                </div>`
      },
      {
        onClickConfirm: () => {
          const payload : DeleteUserRequest = {
            username:username
          };
          this.userService.delete(payload);
        }
      }
    );   
  }

  showMenuModal(dataRow : UserDto): void {   
    //this.modalCreateMenu.isVisible = true;
    this.modalCreateMenu.show();
    this.dataDetail=dataRow
    this.loadCommon();
  }
}
