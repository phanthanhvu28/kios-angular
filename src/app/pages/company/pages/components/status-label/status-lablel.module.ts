import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconsComponentModule } from '@components/icons-component/icons-component.module';
import { BaseDirectiveModule } from '@directives/directives.module';
import { StatusLabelComponent } from './status-label.component';
import { NzTagModule } from 'ng-zorro-antd/tag';

@NgModule({
  declarations: [StatusLabelComponent],
  imports: [
    CommonModule,
    FormsModule,
    IconsComponentModule,
    BaseDirectiveModule,
    NzTagModule
  ],
  exports: [StatusLabelComponent]
})
export class StatusLabelModule {}
