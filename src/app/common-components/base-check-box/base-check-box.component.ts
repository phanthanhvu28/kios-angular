import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-base-check-box',
  templateUrl: './base-check-box.component.html',
  styleUrls: ['./base-check-box.component.less'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: BaseCheckBoxComponent
    }
  ],
  encapsulation: ViewEncapsulation.Emulated
})
export class BaseCheckBoxComponent implements ControlValueAccessor {
  @Input() nzId: string;
  @Input() nzIndeterminate: boolean = false;
  @Input() nzAutoFocus: boolean = false;
  @Input() nzDisabled: boolean | string = false;
  @Input() ngModel: boolean = false;
  @Output() ngModelChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  private onChangeFn: Function = () => {};
  private onTouchedFn: Function = () => {};

  private _nvNgModelDisabled: string | boolean;

  onModelChange(newState: boolean): void {
    this.onTouchedFn();
    this.onChangeFn(!!newState);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['nzDisabled']) {
      this._nvNgModelDisabled = this.nzDisabled;
    }
  }

  writeValue(newState: boolean): void {
    this.ngModel = newState;
  }

  registerOnChange(fn: Function): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onTouchedFn = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (this.nzDisabled === '' || this._nvNgModelDisabled === true) {
      this.nzDisabled = true;
      return;
    }

    this.nzDisabled = isDisabled;
  }
}
