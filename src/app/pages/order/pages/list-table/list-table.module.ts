import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListTableRoutingModule } from './list-table-routing.module';
import { NzCardModule } from 'ng-zorro-antd/card';
import { FormsModule } from '@angular/forms';
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
@NgModule({
  declarations: [ListTableComponent],
  imports: [
    CommonModule,
    FormsModule,
    ListTableRoutingModule,
    ...NZ_MODULE
  ]
})
export class ListTableModule { }
