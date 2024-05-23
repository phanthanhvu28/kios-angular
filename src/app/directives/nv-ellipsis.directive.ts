import {
  ComponentFactoryResolver,
  Directive,
  ElementRef,
  Input,
  Renderer2,
  SimpleChanges,
  ViewContainerRef
} from '@angular/core';
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';
import { NzTSType } from 'ng-zorro-antd/core/types';
import { NzTooltipDirective } from 'ng-zorro-antd/tooltip';
@Directive({ selector: '[nv-ellipsis]', exportAs: 'nvEllipsis' })
export class NvEllipsisDirective extends NzTooltipDirective {
  @Input('nvEllipsisContent') override directiveTitle?: NzTSType | null;
  @Input('nvEllipsisClaim') nvEllipsisClaim?: string | number = 2;
  @Input() nvEllipsisGap?: string | number = 1;
  @Input() nvShowEllipsisTooltip?: boolean = true;
  @Input() set nvCloseOnScroll(newState: boolean) {
    this.checkOnScrollEvent(newState);
  }

  private readonly closeOnScrollEvent = (event: Event) => {
    const isInsidePopup = (event.target as HTMLElement).closest(
      '.nv-ellipsis-directive'
    );
    if (isInsidePopup) {
      return;
    }
    this.hide();
  };

  isShowTooltip: boolean = false;
  get nvEllipsisClass(): string {
    return `nv-text-ellipsis-${this.nvEllipsisClaim || 2}`;
  }
  public resizeObserver: ResizeObserver = null;
  public mutateObserver: MutationObserver = null;

  constructor(
    elementRef: ElementRef,
    hostView: ViewContainerRef,
    resolver: ComponentFactoryResolver,
    renderer: Renderer2,
    noAnimation?: NzNoAnimationDirective
  ) {
    super(elementRef, hostView, resolver, renderer, noAnimation);
  }

  protected override get _overlayClassName(): string | null {
    return `nv-ellipsis-directive ${this.overlayClassName || null}`;
  }

  private get elRefNative(): HTMLElement {
    return this.elementRef.nativeElement as HTMLElement;
  }

  override ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);
    if (changes['nvEllipsisClaim']) {
      const prevClassClaim = `nv-text-ellipsis-${
        changes['nvEllipsisClaim'].previousValue || 2
      }`;

      this.elRefNative.classList.remove('nv-word-break-all');
      this.elRefNative.classList.remove(prevClassClaim);
      if (this.nvEllipsisClaim === 1) {
        this.elRefNative.classList.add('nv-word-break-all');
      }
      this.elRefNative.classList.add(this.nvEllipsisClass);
    }
    this.setTrigger();
  }

  override ngAfterViewInit(): void {
    super.ngAfterViewInit();

    setTimeout(() => {
      this.setTrigger();
    });

    this.mutateObserver = new MutationObserver(() => {
      if (
        typeof this.directiveTitle === 'string' &&
        !this.elRefNative.innerHTML
      ) {
        this.elRefNative.innerHTML = this.directiveTitle as string;
      }
    });
    this.mutateObserver.observe(this.elRefNative, {
      childList: true,
      characterData: true
    });

    this.resizeObserver = new ResizeObserver(() => this.setTrigger());
    this.resizeObserver.observe(this.elementRef.nativeElement);
  }

  isEnableTrigger(): boolean {
    try {
      const ele = this.elementRef.nativeElement as HTMLElement;
      const text = ele.innerHTML || (this.directiveTitle as string);
      const shadowEle = document.createElement('DIV');
      shadowEle.style.width = `${ele.clientWidth + +this.nvEllipsisGap}px`;
      shadowEle.classList.value = ele.classList.value;
      shadowEle.style.display = 'inline-block';
      shadowEle.style.position = 'fixed';
      shadowEle.style.zIndex = '-1';
      shadowEle.style.opacity = '0';
      shadowEle.style.fontSize = window.getComputedStyle(ele).fontSize;
      shadowEle.style.lineHeight = window.getComputedStyle(ele).lineHeight;
      shadowEle.style.fontWeight = window.getComputedStyle(ele).fontWeight;
      shadowEle.innerHTML = text;
      document.body.appendChild(shadowEle);
      const isEnableTrigger = ele.clientHeight < shadowEle.clientHeight;
      shadowEle.remove();
      return isEnableTrigger;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  private checkOnScrollEvent(state: boolean): void {
    if (state) {
      window.addEventListener('scroll', this.closeOnScrollEvent, true);
      return;
    }

    window.removeEventListener('scroll', this.closeOnScrollEvent, true);
  }

  private setTrigger(): void {
    this.isShowTooltip = this.isEnableTrigger();
    this.trigger =
      this.isShowTooltip && this.nvShowEllipsisTooltip ? 'hover' : null;
    this.registerTriggers();
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.resizeObserver?.disconnect();
    this.mutateObserver?.disconnect();
  }
}
