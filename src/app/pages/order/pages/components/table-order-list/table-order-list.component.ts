import { AsyncPipe } from '@angular/common';
import { Component, ElementRef, SimpleChange } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemOptions } from '@models/base-data-list';
import { OrderDetailBaseDto } from '@pages/order/models';
import { OrderListService } from '@pages/order/services';
import { AbsBaseDataListComponent } from 'src/app/abstracts/components/base-data-list.component';

@Component({
  selector: 'app-table-order-list',
  templateUrl: './table-order-list.component.html',
  styleUrls: ['./table-order-list.component.less']
})
export class TableOrderListComponent extends AbsBaseDataListComponent<OrderDetailBaseDto> {
  nvSelections: { [key: string]: Array<ItemOptions> };
  constructor(
    el: ElementRef,
    private orderListService: OrderListService,
    private router: Router,
    private route: ActivatedRoute,
    private asyncPipe: AsyncPipe
  ) {
    super(el);
    console.log("TableList");
  }
  getDataListService(): void {
    this.currentTabService = this.orderListService;    
  }

  protected override ngOnInit() {
    super.ngOnInit();
  }
}
