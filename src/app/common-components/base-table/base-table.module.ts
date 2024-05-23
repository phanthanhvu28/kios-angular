import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseTableBodyComponent } from './components/base-table-body/base-table-body.component';
import { BaseTableNavComponent } from './components/base-table-nav/base-table-nav.component';
import { BaseTableBodyModule } from './components/base-table-body/base-table-body.module';
import { BaseTableComponent } from './base-table.component';
import { NzTableModule, NzTableStyleService } from 'ng-zorro-antd/table';
import { BaseDirectiveModule } from '@directives/directives.module';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { IconsComponentModule } from '@components/icons-component/icons-component.module';
import { BaseModalShowHideColsModule } from '@common-components/base-modal-show-hide-cols/base-modal-show-hide-cols.module';
import { BaseInputModule } from '@common-components/base-input/base-input.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [    
    BaseTableComponent,
    BaseTableNavComponent    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BaseTableBodyModule,
    NzTableModule,
    BaseDirectiveModule,
    BaseModalShowHideColsModule,
    IconsComponentModule,
    NzDividerModule,
    BaseInputModule
  ],
  exports: [
    BaseTableComponent,
    BaseTableNavComponent],
  providers: [NzTableStyleService]
})
export class BaseTableModule { }
