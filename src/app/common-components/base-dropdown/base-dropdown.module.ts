import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BaseInputModule } from '@common-components/base-input/base-input.module';
import { IconsComponentModule } from '@components/icons-component/icons-component.module';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { BaseDropdownComponent } from './base-dropdown.component';
import { BaseDirectiveModule } from '@directives/directives.module';

const COMMON_COMPONENTS_MODULE = [
  BaseInputModule,
  IconsComponentModule,
  BaseDirectiveModule
];

const NZ_MODULE = [
  NzDropDownModule,
  NzInputModule,
  NzIconModule,
  NzEmptyModule
];

@NgModule({
  declarations: [BaseDropdownComponent],
  imports: [
    CommonModule,
    FormsModule,
    ...NZ_MODULE,
    ...COMMON_COMPONENTS_MODULE
  ],
  exports: [BaseDropdownComponent]
})
export class BaseDropdownModule {}
