import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseButtonComponent } from './base-button.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  declarations: [BaseButtonComponent],
  imports: [CommonModule, NzButtonModule, NzNoAnimationModule, NzIconModule],
  exports: [BaseButtonComponent]
})
export class BaseButtonModule {}
