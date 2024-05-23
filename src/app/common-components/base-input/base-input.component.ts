import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { INvSizeInputType } from './base-input.model';

@Component({
  selector: 'app-base-input',
  templateUrl: './base-input.component.html',
  styleUrls: ['./base-input.component.less'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: BaseInputComponent
    }
  ]
})
export class BaseInputComponent implements ControlValueAccessor {
  @Input() nvId: string = null;
  @Input() nvLabel: string = '';
  @Input() nvLabelClass: string = '';
  @Input() nvClass: string = '';
  @Input() nvPlaceholder: string = null;
  @Input() nvClearable: boolean = true;
  @Input() nvBorderless: boolean = false;
  @Input() ngModel: string = '';
  @Input() size: INvSizeInputType = 'small';
  @Input() nvDisabled: string | boolean;
  @Input() nvMaxLength: number | string;
  @Input() nvMask: string = undefined;
  @Input() nvMaxValueMask: number = null;

  @Output() clear: EventEmitter<void> = new EventEmitter();
  @Output() blur: EventEmitter<string> = new EventEmitter();
  @Output() ngModelChange: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('iconAfterAddOnRef') iconAfterAddOnRef: ElementRef;
  @ViewChild('inputRef') inputRef: ElementRef;
  hasIconAddOnAfter: boolean = false;
  onChangeFn: Function = () => {};
  onTouchedFn: Function = () => {};

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    if (!this.iconAfterAddOnRef) return;

    this.hasIconAddOnAfter =
      !!this.iconAfterAddOnRef.nativeElement.childNodes.length;
  }

  onModelChange(newState: string): void {
    this.updateValueNgModel(newState);
    this.checkMaxValueMask();
  }

  updateValueNgModel(value: string): void {
    this.onTouchedFn();
    this.onChangeFn(value);
    this.ngModel = value;
    this.changeDetectorRef.detectChanges();
  }

  checkMaxValueMask(): void {
    if (!this.nvMaxValueMask || !this.ngModel) {
      return;
    }

    const ngModelNumber = parseFloat(this.ngModel);
    if (ngModelNumber <= this.nvMaxValueMask) {
      return;
    }

    const newValue = this.nvMaxValueMask.toString();
    this.updateValueNgModel(newValue);
  }

  onClear(): void {
    if (this.nvDisabled === '' || this.nvDisabled === true) {
      return;
    }

    this.ngModel = '';
    this.onChangeFn('');
    this.clear.emit();
  }

  onBlur(): void {
    this.blur.emit(this.ngModel);
  }

  writeValue(value: string): void {
    this.ngModel = value;
  }
  registerOnChange(fn: Function): void {
    this.onChangeFn = fn;
  }
  registerOnTouched(fn: Function): void {
    this.onTouchedFn = fn;
  }
  setDisabledState(isDisabled: string | boolean): void {
    if (this.nvDisabled === '') {
      this.nvDisabled = true;
      return;
    }
    this.nvDisabled = isDisabled;
  }
}
