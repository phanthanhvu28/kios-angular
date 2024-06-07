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
IconSendComponent
]

@NgModule({
  declarations: [...ICONS_PROVIDER],
  imports: [
    CommonModule
  ],
  exports: [...ICONS_PROVIDER]
})
export class IconsComponentModule { }
