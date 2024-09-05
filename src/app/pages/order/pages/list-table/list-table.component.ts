import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NvMessageService } from '@common-components/base-modal-message/services/nv-message.service';
import { AuthService } from '@pages/auth/services/auth.service';
import TableBaseDto from '@pages/table/models/table.model';
import { TableService } from '@pages/table/services';
import { isNil } from 'ng-zorro-antd/core/util';
import { take, takeUntil, timer } from 'rxjs';
import { AbsBaseDataListComponent } from 'src/app/abstracts/components/base-data-list.component';
import { Utils } from 'src/app/utils/utils';
import { ModalCreateEditOrderComponent } from '../components/modal-create-edit-order/modal-create-edit-order.component';
import { ModalMoveOrderComponent } from '../components/modal-move-order/modal-move-order.component';

@Component({
  selector: 'app-list-table',
  templateUrl: './list-table.component.html',
  styleUrls: ['./list-table.component.less']
})
export class ListTableComponent implements OnInit  {

  @ViewChild('modalCreateEdit')
  modalCreateEdit: ModalCreateEditOrderComponent;

  @ViewChild('modalMove')
  modalMove: ModalMoveOrderComponent;

  //cards = Array.from({ length: 1 }, (_, i) => ({ id: i + 1 }));
  storeCode: string;
  cards : TableBaseDto[];
  cardDetail:TableBaseDto;
  constructor(
    el: ElementRef,
    authService: AuthService,
    private tableService: TableService,
    private router: Router,
    private route: ActivatedRoute,
    private nvMessageService: NvMessageService,
  ) 
  {
     this.storeCode = authService.getCurrentUserParse().storecode
  }
  ngOnInit(): void {
    this.tableService.getTableByStore(this.storeCode);
    this.tableService.tableByStoreObservable$
    .subscribe((res) => {     
      console.log("ngOnInit", res)
      this.cards = res.data
    });
  }
  onCardClick(card: any) {
    console.log('Card clicked:', card);
    this.cardDetail = card;
    this.modalCreateEdit.show()
    // Handle the click event, e.g., navigate, open a modal, etc.
  }
 
  onActionClick(event: MouseEvent, action: any) {
    event.stopPropagation(); // Prevent the click event from bubbling up to the card
    console.log('Action clicked:', action);
    // Handle the action button click event
  }

  onMoveClick(event: MouseEvent, action: any) {
    event.stopPropagation(); // Prevent the click event from bubbling up to the card
    console.log('Move clicked:', action);
    this.modalMove.show()
    // Handle the action button click event
  }

  refresh(): void {
  }
}
