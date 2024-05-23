import { Directive, ElementRef, Input, SimpleChanges } from '@angular/core';
import { TableRowHighlightConfig } from '@models/base-data-list';
import { NvSafeAny } from '@models/base/data.interface';
import { differenceInCalendarDays } from 'date-fns';

interface DueDateWarningAts {
  date: Date;
  days: number;
}

@Directive({
  selector: '[nvWarningByDate]'
})
export class NvWaringByDateDirective {
  @Input() nvWarningByDate: NvSafeAny = null;
  @Input() set nvRowHighlightConfig(config: TableRowHighlightConfig) {
    this._nvRowHighlightable = !!config;
    this._nvRowHighligthConfig = config;

    if (!this._nvRowHighlightable) {
      return;
    }
    this.validHighlight = (data) => {
      let result = true;
      for (const configKey of Object.keys(config.when)) {
        if (data[configKey] !== config.when[configKey]) {
          result = false;
          break;
        }
      }
      return result;
    };
    this.setHighlightClass(this.nvWarningByDate);
  }

  get nvRowHighlightConfig(): TableRowHighlightConfig {
    return this._nvRowHighligthConfig;
  }

  private _nvRowHighlightable: boolean = false;
  private _nvRowHighligthConfig: TableRowHighlightConfig = null;
  private validHighlight: (data: NvSafeAny) => boolean;

  constructor(private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['nvWarningByDate']) {
      this.setHighlightClass(this.nvWarningByDate);
    }
  }

  private setHighlightClass(data: NvSafeAny): void {
    if (!data) {
      return;
    }
    let isAbleToHighlight = false;

    if (this.validHighlight) {
      isAbleToHighlight = this.validHighlight(this.nvWarningByDate);
    }

    if (!isAbleToHighlight) {
      return;
    }

    const { dueDateWarningAts } = data;
    const { by, highlightTrigger } = this.nvRowHighlightConfig;

    if (!dueDateWarningAts || !by) {
      return;
    }

    let warningClass = '';
    for (const [currIndex, curr] of dueDateWarningAts.entries()) {
      const difDays = differenceInCalendarDays(new Date(data[by]), new Date());
      const isHighLight = highlightTrigger
        ? highlightTrigger(difDays, curr.days)
        : difDays <= curr.days;
      if (isHighLight) {
        warningClass = 'nv-warning-date-' + currIndex;
        break;
      }
    }

    !!warningClass && this.el.nativeElement.classList.add(warningClass);
  }
}
