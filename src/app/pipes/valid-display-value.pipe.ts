import { UpperCasePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { NvSafeAny } from '@models/base/data.interface';
import { isNil } from 'ng-zorro-antd/core/util';

/*
 * format check valid value to display
 * return the defaultStr ( default is '') when value is null, undefine, empty string
 * Usage:
 *   value | validDisplayValue: `defaultStr`
 * Example:
 *   {{ '' | validDisplayValue }}
 *   formats to: ''
 *   {{ '' | validDisplayValue: '-' }}
 *   formats to: '-'
 */
@Pipe({ name: 'validDisplayValue' })
export class ValidDisplayValuePipe implements PipeTransform {
  constructor() {}
  transform(
    value: NvSafeAny,
    defaultStr: string = '',
    isCheckZero: boolean = false
  ): string {
    if (value) {
      return value;
    }

    if (
      value === null ||
      value === undefined ||
      value === '' ||
      (value === 0 && isCheckZero)
    ) {
      return defaultStr;
    }

    if (isNaN(value)) {
      return defaultStr;
    }

    return value;
  }
}
