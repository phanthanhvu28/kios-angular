import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconMenuFoldComponent } from './icon-menu-fold/icon-menu-fold.component';
import { IconCloseComponent } from './icon-close/icon-close.component';
import { IconBxSearchComponent } from './icon-bx-search/icon-bx-search.component';
import { IconPlusComponent } from './icon-plus/icon-plus.component';
import { IconRemoveComponent } from './icon-remove/icon-remove.component';

const ICONS_PROVIDER = [
IconMenuFoldComponent,
IconCloseComponent,
IconBxSearchComponent,
IconPlusComponent,
IconRemoveComponent
]

@NgModule({
  declarations: [...ICONS_PROVIDER, IconCloseComponent, IconBxSearchComponent, IconPlusComponent, IconRemoveComponent],
  imports: [
    CommonModule
  ],
  exports: [...ICONS_PROVIDER]
})
export class IconsComponentModule { }
