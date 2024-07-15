import { Component, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NvMessageService } from '@common-components/base-modal-message/services/nv-message.service';
import { ItemOptions } from '@models/base-data-list';
import UserDto from '@pages/user/models/user.model';
import { UserService } from '@pages/user/services/user.service';
import { take, timer } from 'rxjs';
import { AbsBaseDataListComponent } from 'src/app/abstracts/components/base-data-list.component';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent extends AbsBaseDataListComponent<UserDto>{

  nvSelections: { [key: string]: Array<ItemOptions> };

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

}
