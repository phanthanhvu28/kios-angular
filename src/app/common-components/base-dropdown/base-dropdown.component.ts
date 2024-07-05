import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseInputComponent } from '@common-components/base-input/base-input.component';
import { NvSafeAny } from '@models/base/data.interface';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';

@Component({
  selector: 'app-base-dropdown',
  templateUrl: './base-dropdown.component.html',
  styleUrls: ['./base-dropdown.component.less'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => BaseDropdownComponent)
    }
  ]
})
export class BaseDropdownComponent  implements ControlValueAccessor {
  @Input() placeholder: string = '';
  @Input() selectedValue: any;
  @Input() optionKey: string = '';
  @Input() showSearchInput: boolean = true;
  @Input() keySearch: Array<string> = [''];
  @Input() triggerSearch: 'change' | 'click' = 'change';
  @Input() disabled: boolean = false;
  @Input() nvMenuItemRef: TemplateRef<any>;
  @Input() set dataItems(value: Array<any>) {
    this._dataItems = value;
    this.searchResultItems = value;
  }

  @Output() onChangeValue: EventEmitter<any> = new EventEmitter();
  @Output() onSearchValue: EventEmitter<string> = new EventEmitter<string>();
  @Output() onSearchEmit: EventEmitter<Array<any>> = new EventEmitter();

  searchValue = '';
  searchResultItems: Array<any> = [];
  isDropdownVisible: boolean = false;
  @Input() nvSearchWrapperClass: string = '';
  @Input() nvSearchPlaceholder: string = 'Type to search...';
  @Input() nvItemWrapperClass: string = '';
  @Input() nvHeaderTemplate: TemplateRef<void>;
  @Input() nvItemClass: string = '';

  private searchValueHandler: Subject<string> = new Subject<string>();
  private _dataItems: Array<any> = [];
  private destroy$ = new Subject<void>();
  private onTouchFn: Function = () => {};
  private onChangeFn: Function = () => {};
  @ViewChild('searchInput') searchInputEl: BaseInputComponent;  
  
  ngOnInit(): void {
    this.searchValueHandler
      .pipe(
        debounceTime(200), // wait after each keystroke before considering the value
        distinctUntilChanged(), // ignore new value if same as previous value
        takeUntil(this.destroy$)
      )
      .subscribe((value) => this.onSearchValue.emit(value));     
  }
  
  onSelectValue(item: any): void {
    if (!this.isSelectedValueChange(this.selectedValue, item)) {
      return;
    }
    this.selectedValue = item;
    this.onTouchFn();
    this.onChangeFn(item);
    this.onChangeValue.emit(item);
  }

  onSearch(searchText: string): void {
    if (this.triggerSearch === 'click') {
      return;
    }

    if (!searchText || !searchText.trim().length) {
      this.searchResultItems = this._dataItems;
      this.searchValueHandler.next('');

      return;
    }

    this.searchValueHandler.next(searchText);
  }

  onClickSearch() {
    this.onSearchValue.emit(this.searchValue);
  }

  onClearSearch() {
    this.searchValue = '';
    this.onSearchValue.emit('');
  }

  onVisibleChange(visible: boolean): void {
    setTimeout(() => {
      const inputEl = this.searchInputEl?.inputRef
        ?.nativeElement as HTMLElement;
      if (!inputEl || !visible) {
        return;
      }
      inputEl.focus();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private isSelectedValueChange(
    currValue: NvSafeAny,
    nextValue: NvSafeAny
  ): boolean {
    if (!currValue) {
      return !!nextValue;
    }

    if (this.optionKey) {
      return currValue[this.optionKey] !== nextValue[this.optionKey];
    }

    return currValue !== nextValue;
  }

 
 
  writeValue(value: any): void {
    this.selectedValue = value;
  }
  registerOnChange(fn: Function): void {
    this.onChangeFn = fn;
  }
  registerOnTouched(fn: Function): void {
    this.onTouchFn = fn;
  }

}
