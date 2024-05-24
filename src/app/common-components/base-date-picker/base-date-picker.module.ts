import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { BaseDatePickerComponent } from './base-date-picker.component';

@NgModule({
  declarations: [BaseDatePickerComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NzDatePickerModule],
  exports: [BaseDatePickerComponent]
})
export class BaseDatePickerModule {}
