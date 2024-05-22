import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRoutingModule } from './list-routing.module';
import { BaseTableModule } from '@common-components/base-table/base-table.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ListRoutingModule,
    BaseTableModule
  ]
})
export class ListModule { }
