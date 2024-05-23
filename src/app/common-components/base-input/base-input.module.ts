import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { BaseInputComponent } from './base-input.component';
import { IConfig, NgxMaskModule } from 'ngx-mask';


const maskConfig: Partial<IConfig> = {
  validation: false
};
@NgModule({
  declarations: [BaseInputComponent],
  imports: [
    CommonModule,
    NzInputModule,
    FormsModule,
    NgxMaskModule.forRoot(maskConfig)
  ],
  exports: [BaseInputComponent]
})
export class BaseInputModule {}
