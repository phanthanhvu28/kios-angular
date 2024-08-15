import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NvMessageService } from '@common-components/base-modal-message/services/nv-message.service';
import { ItemOptions } from '@models/base-data-list';
import UserDto, { DataFilterUser, DeleteUserRequest } from '@pages/user/models/user.model';
import { UserService } from '@pages/user/services/user.service';
import { take, takeUntil, timer } from 'rxjs';
import { AbsBaseDataListComponent } from 'src/app/abstracts/components/base-data-list.component';
import { Utils } from 'src/app/utils/utils';
import { ModalCreateEditRoleComponent } from '../components/modal-create-edit-role/modal-create-edit-role.component';
import { ModalCreateEditMenuComponent } from '../components/modal-create-edit-menu/modal-create-edit-menu.component';
import { ModalResetPassComponent } from '../components/modal-reset-pass/modal-reset-pass.component';
import { RoleService } from '@pages/role/services/user.service';
import { DataFilterRole, DeleteRoleRequest } from '@pages/role/models';
import RoleDto from '@pages/role/models/role.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent extends AbsBaseDataListComponent<RoleDto>{

  nvSelections: { [key: string]: Array<ItemOptions> };
  filterSelection: DataFilterRole;

  isVisible = false

  dataDetail: RoleDto;

  @ViewChild('modalCreateUser')
  modalCreateUser: ModalCreateEditRoleComponent;

  @ViewChild('modalCreateMenu')
  modalCreateMenu: ModalCreateEditMenuComponent;

  @ViewChild('modalResetPass')
  modalResetPass: ModalResetPassComponent;
  
  constructor(
    el: ElementRef,
    private roleService: RoleService,
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
    this.currentTabService = this.roleService;    
  }

  onFilter(e): void {
    this.setFilterData(e);
  }
  refresh(): void {
    this.getTableData();
  }
  showUploadModal(): void {   
    this.modalCreateUser.show()
    this.loadCommon();
    // console.log("showUploadModal=", this.isVisible)
  }

  private loadCommon():void{
    this.roleService.getFillerRole().pipe(takeUntil(this.destroy$)).subscribe((res)=>{
      this.filterSelection = res?.data
    });
  }

  onDelete(code : string) : void {  
    this.nvMessageService.showConfirmMessage(
      {
        title: 'Delete',
        content: `<div class="nv-body-14-regular nv-text-neutral-600">
                  Do you want to delete role <strong>‘${code}’?</strong>
                </div>`
      },
      {
        onClickConfirm: () => {
          const payload : DeleteRoleRequest = {
            code:code
          };
          this.roleService.delete(payload);
        }
      }
    );   
  }

  showMenuModal(dataRow : RoleDto): void {   
    //this.modalCreateMenu.isVisible = true;
    this.modalCreateMenu.show();
    this.dataDetail=dataRow
    this.loadCommon();
  }

  onClickEdit(dataRow : RoleDto) : void {
    this.loadCommon();
    console.log("onClickEdit",dataRow);
    this.dataDetail = dataRow;
    this.modalCreateUser.show(dataRow);   
  }
}
