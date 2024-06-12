import {
    AbstractControl,
    FormGroup,
    ValidationErrors,
    ValidatorFn
  } from '@angular/forms';
  import { differenceInCalendarDays } from 'date-fns';
  import { isNil } from 'ng-zorro-antd/core/util';
  
  export class NvValidators {
    static required(control: AbstractControl): ValidationErrors | null {
      if (control.errors) {
        delete control.errors.required;
        if (!Object.keys(control.errors).length) {
          control.setErrors(null);
        }
      }
      const controlValue = control.value;
  
      const isEmptyInputValue =
        controlValue == null ||
        (Array.isArray(controlValue) && controlValue.length === 0) ||
        (typeof controlValue === 'string' && !controlValue.toString().trim());
  
      if (isEmptyInputValue) {
        return { required: true };
      }
  
      return control.errors ? control.errors : null;
    }
    static requiredDateRange(control: AbstractControl): ValidationErrors | null {
      if (control.errors) {
        delete control.errors.required;
        if (!Object.keys(control.errors).length) {
          control.setErrors(null);
        }
      }
      const controlValue = control.value;
      const isEmptyInputValue =
        controlValue == null ||
        (Array.isArray(controlValue) && controlValue.length < 2) ||
        (typeof controlValue === 'string' && !controlValue.toString().trim());
  
      if (isEmptyInputValue) {
        return control.errors
          ? { ...control.errors, required: true }
          : { required: true };
      }
  
      return control.errors ? control.errors : null;
    }
    static requiredNumber(control: AbstractControl): ValidationErrors | null {
      if (control.errors) {
        delete control.errors.required;
        if (!Object.keys(control.errors).length) {
          control.setErrors(null);
        }
      }
      const controlValue = control.value;
  
      const isEmptyInputValue =
        isNil(controlValue) ||
        (Array.isArray(controlValue) && controlValue.length === 0) ||
        (typeof controlValue === 'number' && controlValue == 0) ||
        (typeof controlValue === 'string' && !controlValue.toString().trim());
  
      if (isEmptyInputValue) {
        return control.errors
          ? { ...control.errors, required: true }
          : { required: true };
      }
  
      return control.errors ? control.errors : null;
    }
  
    static maxLength(maxLength: number): ValidatorFn {
      return this.maxLengthValidator(maxLength);
    }
  
    static invalidDate(value: string | Date): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
        if (!value || !control.value) {
          return null;
        }
  
        const date = new Date(value);
        const controlDate = new Date(control.value);
        const isValid = differenceInCalendarDays(controlDate, date) >= 0;
        return isValid ? null : { invalidDate: true };
      };
    }
  
    //  just 1 control in form group have value is enough
    static requiredOne(formGroup: FormGroup): ValidationErrors | null {
      if (formGroup.errors) {
        delete formGroup.errors.requiredOne;
        if (!Object.keys(formGroup.errors).length) {
          formGroup.setErrors(null);
        }
      }
  
      const { controls } = formGroup;
      let hasValue = false;
      for (const controlKey in controls) {
        if (controls[controlKey].value) {
          hasValue = true;
          break;
        }
      }
  
      if (!hasValue) {
        return formGroup.errors
          ? { ...formGroup.errors, requiredOne: true }
          : { requiredOne: true };
      }
  
      return formGroup.errors ? formGroup.errors : null;
    }
  
    static isEmptyInputValue(value: any): boolean {
      /**
       * Check if the object is a string or array before evaluating the length attribute.
       * This avoids falsely rejecting objects that contain a custom length attribute.
       * For example, the object {id: 1, length: 0, width: 0} should not be returned as empty.
       */
  
      return (
        value === null ||
        ((typeof value === 'string' || Array.isArray(value)) &&
          value.length === 0)
      );
    }
  
    private static maxLengthValidator(maxLength: number): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
        if (control.errors) {
          delete control.errors.maxLength;
          if (!Object.keys(control.errors).length) {
            control.setErrors(null);
          }
        }
        if (
          this.isEmptyInputValue(control.value) ||
          !this.hasValidLength(control.value)
        ) {
          // don't validate empty values to allow optional controls
          // don't validate values without `length` property
          return control.errors ? control.errors : null;
        }
  
        if (control.value.length > maxLength) {
          const error = {
            maxLength: {
              requiredLength: maxLength,
              actualLength: control.value.length
            }
          };
          return control.errors ? { ...control.errors, ...error } : error;
        }
  
        return control.errors ? control.errors : null;
      };
    }
  
    private static hasValidLength(value: any): boolean {
      // non-strict comparison is intentional, to check for both `null` and `undefined` values
      return value != null && typeof value.length === 'number';
    }
  }
  