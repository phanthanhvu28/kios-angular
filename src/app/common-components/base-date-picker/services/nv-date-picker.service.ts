import { Injectable, OnDestroy } from '@angular/core';
import {
  CandyDate,
  CompatibleValue,
  NormalizedMode,
  cloneDate,
  normalizeRangeValue
} from 'ng-zorro-antd/core/time';
import { CompatibleDate, RangePartType } from 'ng-zorro-antd/date-picker';
import { ReplaySubject, Subject } from 'rxjs';

@Injectable()
export class DatePickerService implements OnDestroy {
  valueChange$ = new ReplaySubject<CompatibleValue>(1);
  emitValue$ = new Subject<void>();
  inputPartChange$ = new Subject<RangePartType | null>();

  initialValue!: CompatibleValue;
  value!: CompatibleValue;
  activeDate?: CompatibleValue;
  activeInput: RangePartType = 'left';
  arrowLeft: number = 0;
  isRange = false;

  initValue(reset: boolean = false): void {
    if (reset) {
      this.initialValue = this.isRange ? [] : null;
    }

    this.setValue(this.initialValue);
  }

  setValue(value: CompatibleValue): void {
    this.value = value;
    this.valueChange$.next(this.value);
  }

  getActiveIndex(part: RangePartType = this.activeInput): number {
    return { left: 0, right: 1 }[part];
  }

  hasValue(value: CompatibleValue = this.value): boolean {
    return Array.isArray(value) ? !!value[0] || !!value[1] : !!value;
  }

  makeValue(value?: CompatibleDate): CompatibleValue {
    if (this.isRange) {
      return value ? (value as Date[]).map((val) => new CandyDate(val)) : [];
    }

    return value ? new CandyDate(value as Date) : null;
  }

  setActiveDate(
    value: CompatibleValue,
    hasTimePicker: boolean = false,
    mode: NormalizedMode = 'month'
  ): void {
    const parentPanels = {
      date: 'month',
      month: 'year',
      year: 'decade'
    };

    this.activeDate = !this.isRange
      ? cloneDate(value)
      : normalizeRangeValue(
          value as CandyDate[],
          hasTimePicker,
          parentPanels[mode],
          this.activeInput
        );
  }

  ngOnDestroy(): void {
    this.valueChange$.complete();
    this.emitValue$.complete();
    this.inputPartChange$.complete();
  }
}
