import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRoutingModule } from './list-routing.module';
import { BaseTableModule } from '@common-components/base-table/base-table.module';
import { ListComponent } from './list.component';
import { StatusLabelModule } from '../components/status-label/status-lablel.module';
import { FormsModule } from '@angular/forms';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';


@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    ListRoutingModule,
    BaseTableModule,
    StatusLabelModule,
    FormsModule,
    NzToolTipModule
  ]
})
export class ListModule { }
