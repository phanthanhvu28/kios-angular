import { Component, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-base-button',
  templateUrl: './base-button.component.html',
  styleUrls: ['./base-button.component.less'],
  host: {
    '[class.nv-base-button--disabled]': 'disabled'
  }
})
export class BaseButtonComponent {
  @Input() className:
    | string
    | 'base-button--text'
    | 'base-button--neutral'
    | 'base-button--primary'
    | 'base-button--space'
    | 'base-button--space-neutral'
    | 'base-button--full'
    | 'base-button--lg'
    | 'base-button--sm' = '';
  @Input() disabled: boolean = false;
  @Input() nzLoading: boolean = false;
  @Input() type: 'submit' | 'reset' | 'button' = 'button';

  constructor(private elementRef: ElementRef) {}

  get hostEl(): HTMLElement {
    return this.elementRef.nativeElement as HTMLElement;
  }

  ngAfterViewInit(): void {
    if (!this.hostEl) {
      return;
    }

    this.hostEl.addEventListener('click', this.handleHostClick, true);
  }

  ngOnDestroy(): void {
    if (!this.hostEl) {
      return;
    }

    this.hostEl.removeEventListener('click', this.handleHostClick, true);
  }

  private handleHostClick = (event: PointerEvent) => {
    this.hostEl.style.cursor = this.disabled ? 'not-allowed' : '';

    if (this.disabled) {
      event?.stopImmediatePropagation();
      return false;
    }

    return true;
  };
}
