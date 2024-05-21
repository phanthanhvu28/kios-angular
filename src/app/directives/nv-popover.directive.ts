import { Directive, HostListener, Input } from '@angular/core';
import { isNil } from 'ng-zorro-antd/core/util';
import { NzPopoverDirective } from 'ng-zorro-antd/popover';

@Directive({
  selector: '[nv-popover]'
})
export class NvPopoverDirective extends NzPopoverDirective {

  @Input() set nvValidPopover(value: boolean) {
    if (!value) {
      this.visible = false;
      this.trigger = null;
      this.registerTriggers();
    }
  }
  @Input() nvPopoverCloseOnHover: boolean | string;

  @HostListener('mouseleave') checkMouseLeave(): void {
    if (
      !isNil(this.nvPopoverCloseOnHover) &&
      this.nvPopoverCloseOnHover !== false
    ) {
      this.hide();
    }
  }

  protected override get _overlayClassName(): string | null {
    return `nv-popover-directive ${this.overlayClassName || null}`;
  }

  override ngAfterViewInit(): void {
    super.ngAfterViewInit();
  }
}
