import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconMenuFoldComponent } from './icon-menu-fold/icon-menu-fold.component';

const ICONS_PROVIDER = [
IconMenuFoldComponent
]

@NgModule({
  declarations: [...ICONS_PROVIDER],
  imports: [
    CommonModule
  ],
  exports: [...ICONS_PROVIDER]
})
export class IconsComponentModule { }
