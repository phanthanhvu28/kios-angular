import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NvPopoverDirective } from './nv-popover.directive';
import { NvHasPermission } from './has-permission.directive';
// import { HasPermissionDirective, NvHasPermission } from './has-permission.directive';

const DIRECTIVES_PROVIDER = [
  NvPopoverDirective,
  // NvWaringByDateDirective,
  // NvEllipsisDirective,
   NvHasPermission,
  // NvTooltipBaseInputDirective
];

@NgModule({
  declarations: [
    ...DIRECTIVES_PROVIDER,
    //HasPermissionDirective
  ],
  imports: [
    CommonModule
  ], 
  exports: [...DIRECTIVES_PROVIDER],
})
export class BaseDirectiveModule { }
