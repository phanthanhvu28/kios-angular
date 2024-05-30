import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { BaseInputNumberComponent } from './base-input-number.component';
@NgModule({
  declarations: [BaseInputNumberComponent],
  imports: [CommonModule, NzInputNumberModule, FormsModule],
  exports: [BaseInputNumberComponent]
})
export class BaseInputNumberModule {}
