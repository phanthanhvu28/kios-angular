import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRoutingModule } from './list-routing.module';
import { BaseTableModule } from '@common-components/base-table/base-table.module';
import { ListComponent } from './list.component';
import { StatusLabelModule } from '../components/status-label/status-lablel.module';
import { FormsModule } from '@angular/forms';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { BaseButtonModule } from '@common-components/base-button/base-button.module';
import { IconsComponentModule } from '@components/icons-component/icons-component.module';

const BASE_MODULE = [
  BaseTableModule,  
  BaseButtonModule  
];

@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    ListRoutingModule,    
    StatusLabelModule,
    FormsModule,
    NzToolTipModule,
    IconsComponentModule,
    ...BASE_MODULE
  ]
})
export class ListModule { }
