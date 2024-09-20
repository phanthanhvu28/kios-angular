import { AsyncPipe } from '@angular/common';
import { Component, ElementRef, SimpleChange } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemOptions } from '@models/base-data-list';
import { OrderDetailBaseDto } from '@pages/order/models';
import { OrderListService } from '@pages/order/services';
import { take, timer } from 'rxjs';
import { AbsBaseDataListComponent } from 'src/app/abstracts/components/base-data-list.component';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-table-order-list',
  templateUrl: './table-order-list.component.html',
  styleUrls: ['./table-order-list.component.less'],
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
  }
  getDataListService(): void {        
    this.currentTabService = this.orderListService;    
  }

  ngAfterViewInit(): void {
    timer(100)
      .pipe(take(1))
      .subscribe(() => {
        this.tableHeight = Utils.getTableHeight(this.el.nativeElement);
        Utils.setTableHeight(this.el.nativeElement, this.tableHeight-600);
      });
  }

  protected override ngOnInit() {
    super.ngOnInit();
  }

  onDelete(code:string){

  }
  override ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();   
  }
}
