import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRoutingModule } from './list-routing.module';
import { BaseTableModule } from '@common-components/base-table/base-table.module';
import { BaseButtonModule } from '@common-components/base-button/base-button.module';

import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzResizableModule } from 'ng-zorro-antd/resizable';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { ListComponent } from './list.component';
import { IconsComponentModule } from '@components/icons-component/icons-component.module';
import { BaseInputModule } from '@common-components/base-input/base-input.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { ModalCreateEditProductComponent } from '../components/modal-create-edit-store/modal-create-edit-product.component';
import { BaseDropdownModule } from '@common-components/base-dropdown/base-dropdown.module';
import { BaseDirectiveModule } from '@directives/directives.module';
import { NzDividerModule } from 'ng-zorro-antd/divider';

const BASE_MODULE = [
  BaseTableModule,  
  BaseButtonModule,
  IconsComponentModule,
  BaseInputModule,
  BaseDropdownModule,
  BaseDirectiveModule
];

const NZ_MODULE = [
  NzButtonModule,    
  NzModalModule,
  NzTabsModule,
  NzStepsModule,
  NzDividerModule,
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
  declarations: [ListComponent,ModalCreateEditProductComponent],
  imports: [
    CommonModule,
    ListRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NzToolTipModule,
    ...BASE_MODULE,
    ...NZ_MODULE
  ]
})
export class ListModule { }
