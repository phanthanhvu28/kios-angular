import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseModalShowHideColsComponent } from '@common-components/base-modal-show-hide-cols/base-modal-show-hide-cols.component';
import { BaseModalModule } from '@common-components/base-modal/base-modal.module';
import { ReactiveFormsModule } from '@angular/forms';
import { IconsComponentModule } from '@components/icons-component/icons-component.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BaseButtonModule } from '@common-components/base-button/base-button.module';
import { AvailableColItemComponent } from './components/available-col-item/available-col-item.component';
import { SelectedColItemComponent } from './components/selected-col-item/selected-col-item.component';
import { BaseInputModule } from '@common-components/base-input/base-input.module';

@NgModule({
  declarations: [
    BaseModalShowHideColsComponent,
    AvailableColItemComponent,
    SelectedColItemComponent,
    SelectedColItemComponent,
    AvailableColItemComponent
  ],
  imports: [
    CommonModule,
    BaseModalModule,
    ReactiveFormsModule,
    BaseInputModule,
    IconsComponentModule,
    DragDropModule,
    BaseButtonModule
  ],
  exports: [BaseModalShowHideColsComponent]
})
export class BaseModalShowHideColsModule {}
