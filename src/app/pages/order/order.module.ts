import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { TableOrderListComponent } from './pages/components/table-order-list/table-order-list.component';


@NgModule({
  declarations: [     
  ],
  imports: [
    CommonModule,
    OrderRoutingModule
  ]
})
export class OrderModule { }
