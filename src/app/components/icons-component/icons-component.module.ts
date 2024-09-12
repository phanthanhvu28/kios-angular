import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconMenuFoldComponent } from './icon-menu-fold/icon-menu-fold.component';
import { IconCloseComponent } from './icon-close/icon-close.component';
import { IconBxSearchComponent } from './icon-bx-search/icon-bx-search.component';
import { IconPlusComponent } from './icon-plus/icon-plus.component';
import { IconRemoveComponent } from './icon-remove/icon-remove.component';
import { IconSortAscComponent } from './icon-sort-asc/icon-sort-asc.component';
import { IconSortDescComponent } from './icon-sort-desc/icon-sort-desc.component';
import { IconRedoComponent } from './icon-redo/icon-redo.component';
import { IconEnterComponent } from './icon-enter/icon-enter.component';
import { IconArrowOutlineComponent } from './icon-arrow-outline/icon-arrow-outline.component';
import { IconFilterComponent } from './icon-filter/icon-filter.component';
import { IconSaveComponent } from './icon-save/icon-save.component';
import { IconSendComponent } from './icon-send/icon-send.component';
import { IconFullscreenComponent } from './icon-fullscreen/icon-fullscreen.component';
import { IconFullscreenExitComponent } from './icon-fullscreen-exit/icon-fullscreen-exit.component';
import { IconBellComponent } from './icon-bell/icon-bell.component';
import { IconChevronComponent } from './icon-chevron/icon-chevron.component';
import { IconCheckComponent } from './icon-check/icon-check.component';
import { IconDoubleLineComponent } from './icon-double-line/icon-double-line.component';
import { IconArrowComponent } from './icon-arrow/icon-arrow.component';
import { IconNotificationComponent } from './icon-notification/icon-notification.component';
import { IconEditComponent } from './icon-edit/icon-edit.component';
import { IconDeleteComponent } from './icon-delete/icon-delete.component';
import { IconMenuComponent } from './icon-menu/icon-menu.component';
import { IconResetPassComponent } from './icon-reset-pass/icon-reset-pass.component';
import { IconPaymentComponent } from './icon-payment/icon-payment.component';
import { IconDollarComponent } from './icon-dollar/icon-dollar.component';

const ICONS_PROVIDER = [
IconMenuFoldComponent,
IconCloseComponent,
IconBxSearchComponent,
IconPlusComponent,
IconRemoveComponent,
IconSortAscComponent,
IconSortDescComponent,
IconRedoComponent,
IconEnterComponent,
IconArrowOutlineComponent,
IconFilterComponent,
IconSaveComponent,
IconSendComponent,
IconFullscreenComponent, 
IconFullscreenExitComponent,
IconBellComponent, 
IconChevronComponent, 
IconCheckComponent, 
IconDoubleLineComponent,
IconArrowComponent,
IconNotificationComponent,
IconEditComponent,
IconDeleteComponent,
IconMenuComponent,
IconResetPassComponent,
IconPaymentComponent,
IconDollarComponent
]

@NgModule({
  declarations: [...ICONS_PROVIDER],
  imports: [
    CommonModule
  ],
  exports: [...ICONS_PROVIDER]
})
export class IconsComponentModule { }
