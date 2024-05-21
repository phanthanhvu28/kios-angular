import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseTableBodyComponent } from './components/base-table-body/base-table-body.component';
import { BaseTableNavComponent } from './components/base-table-nav/base-table-nav.component';
import { BaseTableBodyModule } from './components/base-table-body/base-table-body.module';
import { BaseTableComponent } from './base-table.component';
import { NzTableModule, NzTableStyleService } from 'ng-zorro-antd/table';
import { BaseDirectiveModule } from '@directives/directives.module';
import { NzDividerModule } from 'ng-zorro-antd/divider';


@NgModule({
  declarations: [    
    BaseTableComponent,
    BaseTableNavComponent    
  ],
  imports: [
    CommonModule,
    BaseTableBodyModule,
    NzTableModule,
    BaseDirectiveModule,
    NzDividerModule
  ],
  exports: [
    BaseTableComponent,
    BaseTableNavComponent],
  providers: [NzTableStyleService]
})
export class BaseTableModule { }
