import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzDestroyService } from 'ng-zorro-antd/core/services';
import { isNil } from 'ng-zorro-antd/core/util';
import { NzInputNumberComponent } from 'ng-zorro-antd/input-number';
import { INvSizeInputType } from './base-input-number.model';

@Component({
  selector: 'app-base-input-number',
  templateUrl: './base-input-number.component.html',
  styleUrls: ['./base-input-number.component.less'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: BaseInputNumberComponent
    },
    NzDestroyService
  ],
  host: {
    class: 'ant-input-number',
    '[class.ant-input-number-disabled]': 'nzDisabled || nvDisabled === true'
  }
})
export class BaseInputNumberComponent extends NzInputNumberComponent {
  @Input() nvId: string = null;
  @Input() override nzPlaceHolder: string = 'No.';
  @Input() nvLabel: string = '';
  @Input() nvLabelClass: string = '';
  @Input() nvClass: string = '';
  @Input() nvClearable: boolean = true;
  @Input() size: INvSizeInputType = 'small';
  @Input() set nvDisabled(value: string | boolean) {
    this.usingNvDisabled = true;
    if (value === '') {
      this._nvDisabled = true;
      return;
    }

    this._nvDisabled = value;
  }
  @Input() nvIsPositive: boolean = false; //Make number only positive only
  @Input() nvDecimal: number;
  @Input() nullable: boolean = false;

  @Output() onClear: EventEmitter<void> = new EventEmitter<void>();
  @Output() onBlur: EventEmitter<number> = new EventEmitter<number>();

  @ViewChild('iconAfterAddOnRef') iconAfterAddOnRef: ElementRef;

  private _nvDisabled: string | boolean;
  get nvDisabled(): string | boolean {
    return this._nvDisabled;
  }
  usingNvDisabled: boolean = false;
  hasIconAddOnAfter: boolean = false;

  override ngAfterViewInit(): void {
    super.ngAfterViewInit();
    if (!this.iconAfterAddOnRef) return;

    this.hasIconAddOnAfter =
      !!this.iconAfterAddOnRef.nativeElement.childNodes.length;
  }

  clear(): void {
    const validNullValue = this.getValidValue();
    const validValue = this.toNumber(
      Math.abs(this.nzMin) !== Infinity || Math.abs(this.nzMax) !== Infinity
        ? isNaN(+validNullValue)
          ? ''
          : +validNullValue
        : ''
    );

    this.setValue(validValue);
    this.updateDisplayValue(validValue);
    this.onClear.emit();
    this.onBlur.emit(validValue);
  }

  blurHandler(event: FocusEvent): void {
    event.stopPropagation();
    super.blur();
    const validValue = this.toNumber(
      Math.abs(this.nzMin) !== Infinity || Math.abs(this.nzMax) !== Infinity
        ? this.nullable
          ? this.getValidValue(this.displayValue)
          : +this.getValidValue(+this.displayValue)
        : this.getCurrentValidValue(this.displayValue)
    );

    this.setValue(validValue);
    this.updateDisplayValue(validValue);
    this.onBlur.emit(validValue);
  }

  override updateDisplayValue(value: number): void {
    super.updateDisplayValue(
      this.getCurrentValidValue(this.getDecimalValue(value))
    );
  }

  override setValue(value: number): void {
    super.setValue(this.getDecimalValue(value));
  }

  override setDisabledState(disabled: boolean): void {
    if (this.usingNvDisabled) {
      return;
    }

    super.setDisabledState(disabled);
    if (this.nvDisabled === '') {
      this._nvDisabled = true;
      return;
    }
    this._nvDisabled = disabled;
  }

  get isDisabled(): boolean {
    return !!this.nzDisabled || this.nvDisabled === true ? true : null;
  }

  private getDecimalValue(value: number): number {
    if (!value) {
      return value;
    }

    if (isNil(this.nvDecimal)) {
      return value;
    }

    const decimalValue = +value.toFixed(this.nvDecimal);
    if (isNaN(decimalValue)) {
      return value;
    }

    return decimalValue;
  }
}
