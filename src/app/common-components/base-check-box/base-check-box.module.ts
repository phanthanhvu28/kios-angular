import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { BaseCheckBoxComponent } from './base-check-box.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [BaseCheckBoxComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NzCheckboxModule],
  exports: [BaseCheckBoxComponent]
})
export class BaseCheckBoxModule {}
