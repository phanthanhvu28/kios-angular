import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseModalComponent } from './base-modal.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { BaseButtonModule } from '../base-button/base-button.module';
import { IconsComponentModule } from '@components/icons-component/icons-component.module';

@NgModule({
  declarations: [BaseModalComponent],
  imports: [
    CommonModule,
    NzModalModule,
    BaseButtonModule,
    IconsComponentModule
  ],
  exports: [BaseModalComponent]
})
export class BaseModalModule {}
