import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListTableRoutingModule } from './list-table-routing.module';
import { NzCardModule } from 'ng-zorro-antd/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListTableComponent } from './list-table.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzResizableModule } from 'ng-zorro-antd/resizable';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { ModalMoveOrderComponent } from '../components/modal-move-order/modal-move-order.component';
import { ModalCreateEditOrderComponent } from '../components/modal-create-edit-order/modal-create-edit-order.component';
import { BaseTableModule } from '@common-components/base-table/base-table.module';
import { BaseButtonModule } from '@common-components/base-button/base-button.module';
import { IconsComponentModule } from '@components/icons-component/icons-component.module';
import { BaseInputModule } from '@common-components/base-input/base-input.module';
import { BaseDropdownModule } from '@common-components/base-dropdown/base-dropdown.module';
import { BaseDirectiveModule } from '@directives/directives.module';
import { BaseModalModule } from '@common-components/base-modal/base-modal.module';
import { BaseInputNumberModule } from "../../../../common-components/base-input-number/base-input-number.module";

const NZ_MODULE = [
  NzCardModule,
  NzIconModule,
  NzAvatarModule,
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
  NzGridModule,
  NzTreeModule  
]

const BASE_MODULE = [
  BaseTableModule,  
  BaseButtonModule,
  IconsComponentModule,
  BaseInputModule,
  BaseDropdownModule,
  BaseDirectiveModule,  
  BaseModalModule
];
@NgModule({
  declarations: [ListTableComponent,
    ModalCreateEditOrderComponent,
    ModalMoveOrderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ListTableRoutingModule,
    ...NZ_MODULE,
    ...BASE_MODULE,
    BaseInputNumberModule
]
})
export class ListTableModule { }
