import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRoutingModule } from './list-routing.module';
import { BaseTableModule } from '@common-components/base-table/base-table.module';
import { ListComponent } from './list.component';
import { StatusLabelModule } from '../components/status-label/status-lablel.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { BaseButtonModule } from '@common-components/base-button/base-button.module';
import { IconsComponentModule } from '@components/icons-component/icons-component.module';
import { ModalCreateEditCompanyComponent } from '../components/modal-create-edit-company/modal-create-edit-company.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzResizableModule } from 'ng-zorro-antd/resizable';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { BaseInputComponent } from '@common-components/base-input/base-input.component';
import { BaseInputModule } from '@common-components/base-input/base-input.module';
const BASE_MODULE = [
  BaseTableModule,  
  BaseButtonModule
];

const NZ_MODULE = [
  NzButtonModule,    
  NzModalModule,
  NzTabsModule,
  NzStepsModule,
 
  NzLayoutModule,
  NzMenuModule,
  NzResizableModule,
  NzProgressModule,  
  NzNotificationModule,
  NzDrawerModule,
  NzToolTipModule,
  NzGridModule
  
];

@NgModule({
  declarations: [ListComponent,ModalCreateEditCompanyComponent],
  imports: [
    CommonModule,
    ListRoutingModule,    
    StatusLabelModule,
    FormsModule,
    ReactiveFormsModule,
    NzToolTipModule,
    IconsComponentModule,
    BaseInputModule,
    ...BASE_MODULE,
    ...NZ_MODULE
  ]
})
export class ListModule { }
