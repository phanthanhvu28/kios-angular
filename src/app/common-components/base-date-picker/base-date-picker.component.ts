import { Directionality } from '@angular/cdk/bidi';
import { Platform } from '@angular/cdk/platform';
import {  DatePipe } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter, 
  Input,
  NgZone,
  Optional,
  Output,
  Renderer2,
  forwardRef
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { differenceInCalendarDays } from 'date-fns';
import { NzResizeObserver } from 'ng-zorro-antd/cdk/resize-observer';
import { NzConfigService } from 'ng-zorro-antd/core/config';
import {
  CompatibleDate,
  NzDatePickerComponent
} from 'ng-zorro-antd/date-picker';
import { DateHelperService, NzI18nService } from 'ng-zorro-antd/i18n';

import { DatePickerService } from './services/nv-date-picker.service';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzDestroyService } from 'ng-zorro-antd/core/services';

@Component({
  selector: 'app-base-date-picker',
  templateUrl: './base-date-picker.component.html',
  styleUrls: ['./base-date-picker.component.less'],
  providers: [
    DatePickerService,
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => BaseDatePickerComponent)
    }
  ]
})
export class BaseDatePickerComponent extends NzDatePickerComponent {
  @Input() nvClass: string = '';
  @Input() ngModel: string | Date = '';
  @Input() nvAllowSelectCurrentDate: boolean = false;
  @Input() nvAllowSelectDateAfterOn: boolean = false;
  @Input() size: 'medium' | 'small' | 'ssmall' | 'xs' = 'ssmall';
  @Input() nvApplyFormatValue: boolean = false;

  @Input() set disabledBeforeDate(value: string | Date) {
    this.nzDisabledDate = this.setDisableBeforeFn(value);
  }

  @Input() set disabledAfterDate(value: string | Date) {
    this.nzDisabledDate = this.setDisableAfterFn(value);
  }

  @Input() set disabledDate(value: string | Date | Array<string | Date>) {
    this.nzDisabledDate = this.setDisableFn(value);
  }

  @Output() onClear: EventEmitter<void> = new EventEmitter();
  @Output() ngModelChange: EventEmitter<string | Date> = new EventEmitter<
    string | Date
  >();

  readonly nvDefaultFormat: string = 'yyyy-MM-dd';
  readonly popupStylePatch = { position: 'relative', width: '100%' };

  constructor(
    private datePipe: DatePipe,
    nzConfigService: NzConfigService,
    datePickerService: DatePickerService,
    i18n: NzI18nService,
    cdr: ChangeDetectorRef,
    renderer: Renderer2,
    ngZone: NgZone,
    elementRef: ElementRef,
    dateHelper: DateHelperService,
    nzResizeObserver: NzResizeObserver,
    platform: Platform,   
    @Optional() directionality: Directionality,
    @Optional() destroy: NzDestroyService ,
    
  ) {
    super(
      nzConfigService,
      datePickerService,
      i18n,
      cdr,
      renderer,
      ngZone,
      elementRef,
      dateHelper,
      nzResizeObserver,
      platform,
      destroy,
      "",
      directionality
    );
  }

  onModelChange(value: string | Date) {
    const newState = this.getValidDate(value);

    this.onTouchedFn();
    this.ngModel = newState;
    this.onChangeFn(newState);
  }

  override onClickClear(event: MouseEvent) {
    super.onClickClear(event);
    this.onClear.emit();
  }

  private setDisableFn(
    value: string | Date | Array<string | Date>
  ): (current: Date) => boolean {
    return (current: Date) => {
      const isBetween = Array.isArray(value);
      if (isBetween) {
        return (
          this.setDisableBeforeFn(value[0])(current) ||
          this.setDisableAfterFn(value[1])(current)
        );
      }
      return this.setDisableBeforeFn(value)(current);
    };
  }

  private setDisableAfterFn(value: string | Date): (current: Date) => boolean {
    const date = new Date(value);

    return (current: Date) =>
      this.nvAllowSelectDateAfterOn
        ? differenceInCalendarDays(current, date) > 0
        : differenceInCalendarDays(current, date) >= 0;
  }
  private setDisableBeforeFn(value: string | Date): (current: Date) => boolean {
    const date = new Date(value);

    return (current: Date) =>
      this.nvAllowSelectCurrentDate
        ? differenceInCalendarDays(current, date) < 0
        : differenceInCalendarDays(current, date) <= 0;
  }

  override writeValue(value: CompatibleDate): void {
    super.writeValue(value);

    this.ngModel = this.getValidDate(value);
  }

  private getValidDate(value: string | Date | CompatibleDate): string | Date {
    const isArrayDate = Array.isArray(value);
    if (this.nvApplyFormatValue) {
      return isArrayDate ? value.at(0) : value;
    }
    return this.datePipe.transform(
      isArrayDate ? value.at(0) : value,
      this.nzFormat || this.nvDefaultFormat
    );
  }

  override setDisabledState(isDisabled: boolean): void {
    super.setDisabledState(isDisabled);
    this.nzDisabled = isDisabled;
  }
}
