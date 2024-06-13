import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconsComponentModule } from '@components/icons-component/icons-component.module';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { BaseButtonModule } from '../base-button/base-button.module';
import { BaseModalMessageComponent } from './base-modal-message.component';
import { ModalMessageContentComponent } from './components/modal-message-content/modal-message-content.component';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  declarations: [BaseModalMessageComponent, ModalMessageContentComponent],
  imports: [
    CommonModule,
    NzModalModule,
    BaseButtonModule,
    IconsComponentModule,
    NzIconModule
  ],
  exports: [BaseModalMessageComponent, ModalMessageContentComponent]
})
export class BaseModalMessageModule {}
