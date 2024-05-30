import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzSelectModule } from 'ng-zorro-antd/select';

import { BaseButtonModule } from '@common-components/base-button/base-button.module';
import { BaseCheckBoxModule } from '@common-components/base-check-box/base-check-box.module';
import { BaseDatePickerModule } from '@common-components/base-date-picker/base-date-picker.module';
//import { BaseInputNumberModule } from '@common-components/base-input-number/base-input-number.module';
import { BaseInputModule } from '@common-components/base-input/base-input.module';
import { IconsComponentModule } from '@components/icons-component/icons-component.module';

import { BaseDirectiveModule } from '@directives/directives.module';
import { PipesModule } from 'src/app/pipes/pipes.module';

//import { BaseDatePickerRangeNewModule } from '@common-components/base-date-picker-range-new/base-date-picker-range-new.module';
import { BaseTableFilterComponent } from './base-table-filter.component';
import { BaseCellFilterTemplateComponent } from './components/cell-filter-template/cell-filter-template.component';
import { BaseTableFilterTemplateComponent } from './components/table-filter-template/table-filter-template.component';
import { BaseInputNumberModule } from '@common-components/base-input-number/base-input-number.module';
//import { BaseTableFilterTemplateComponent } from './components/table-filter-template/table-filter-template.component';

const NZ_MODULE = [
  NzPopoverModule,
  NzInputModule,
  NzSelectModule,
  NzFormModule,
  NzIconModule,
  NzBadgeModule,
  NzDividerModule
];

const COMMON_MODULE = [
  BaseCheckBoxModule,
  BaseDirectiveModule,
  BaseButtonModule,
  BaseInputModule,
  BaseDatePickerModule,
  // BaseDatePickerRangeNewModule,
  BaseInputNumberModule,
  PipesModule,
  IconsComponentModule
];

const COMPONENTS = [
  BaseTableFilterComponent,
  BaseTableFilterTemplateComponent,
  BaseCellFilterTemplateComponent
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...COMMON_MODULE,
    ...NZ_MODULE
  ],
  exports: [...COMPONENTS]
})
export class BaseTableFilterModule {}
