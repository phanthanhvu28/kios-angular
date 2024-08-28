import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NvMessageService } from '@common-components/base-modal-message/services/nv-message.service';
import TableBaseDto from '@pages/table/models/table.model';
import { TableService } from '@pages/table/services';
import { isNil } from 'ng-zorro-antd/core/util';
import { take, takeUntil, timer } from 'rxjs';
import { AbsBaseDataListComponent } from 'src/app/abstracts/components/base-data-list.component';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-list-table',
  templateUrl: './list-table.component.html',
  styleUrls: ['./list-table.component.less']
})
export class ListTableComponent implements OnInit  {

  //cards = Array.from({ length: 1 }, (_, i) => ({ id: i + 1 }));
  cards : TableBaseDto[]
  constructor(
    el: ElementRef,
    private tableService: TableService,
    private router: Router,
    private route: ActivatedRoute,
    private nvMessageService: NvMessageService,
  ) 
  {
     
  }
  ngOnInit(): void {
    this.tableService.getTableByStore("STO073450959401456");
    this.tableService.tableByStoreObservable$
    .subscribe((res) => {     
      console.log("ngOnInit", res)
      this.cards = res.data
    });
  }
  onCardClick(card: any) {
    console.log('Card clicked:', card);
    // Handle the click event, e.g., navigate, open a modal, etc.
  }
 
  onActionClick(event: MouseEvent, action: any) {
    event.stopPropagation(); // Prevent the click event from bubbling up to the card
    console.log('Action clicked:', action);
    // Handle the action button click event
  }
}
