import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import { ListComponent } from './pages/list/list.component';
import { DetailComponent } from './pages/detail/detail.component';
import { StatusLabelComponent } from './pages/components/status-label/status-label.component';
import { ModalCreateEditCompanyComponent } from './pages/components/modal-create-edit-company/modal-create-edit-company.component';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { BaseButtonModule } from '@common-components/base-button/base-button.module';
import { IconsComponentModule } from '@components/icons-component/icons-component.module';

const NZ_MODULE = [  
  NzDrawerModule,
  NzButtonModule,
  NzTableModule,
  NzInputModule,
  NzGridModule,
  NzDropDownModule,
  NzPaginationModule,
  NzSelectModule,
  NzIconModule,
  NzTagModule,
  NzTabsModule,
  NzRadioModule,
  NzDividerModule,
  NzPopoverModule,
  NzToolTipModule,
  NzModalModule,
  NzRadioModule,
  NzSpinModule,
];

@NgModule({
  declarations: [
    // ListComponent,
    // DetailComponent 
  
    //ModalCreateEditCompanyComponent
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    FormsModule,
    BaseButtonModule,
    IconsComponentModule,
    ...NZ_MODULE
  ]
})
export class CompanyModule { }
