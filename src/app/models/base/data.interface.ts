export interface ListRequestModel {
    filters: Array<Filter>;
    sorts: Array<string>;
    page: number;
    pageSize: number;
    includes: Array<any>; // <<< This field is in updating...
  }
  
  export interface ListResponseModel<ITEMS, DATA = any> {
    items: ITEMS[] | [];
    data?: DATA;
    totalItems: number;
    page: number;
    pageSize: number;
    isError?: boolean;
    errorMessage?: any;
    errorCode?: number;
    errorStack?: any; // TODO: remove ??
  }

  export interface ResultListModel<T> {
    items: T[] | [];
    data?: any;
    totalItems: number;
    page: number;
    pageSize: number;
    isError: boolean;
    errorMessage: any;
  }
  
  export interface SingleResponseModel<DATA = any> {
    data?: DATA;
    isError: boolean;
    errorMessage: any;
    errorCode?: number;
    errorStack?: any; // TODO: remove ??
  }

  export interface ResultDataResponse {
    data?: any;
    isError: boolean;
    errorMessage: any;
    errorCode: number;
  }
  export interface ResultModel<T> {
    data: T | null;
    isError: boolean;
    errorMessage: any;
    errorCode: number;
    errorStack: any;
  }
  
  export interface ItemOptions {
    label: string;
    value: string;
    parentValue?: string;
  }
  
  export enum FilterComparison {
    Equal = '==',
    NotEqual = '!=',
    Bigger = '>',
    BiggerOrEqual = '>=',
    Smaller = '<',
    SmallerOrEqual = '<=',
    Contains = 'Contains',
    StartsWith = 'StartsWith',
    EndsWith = 'EndsWith',
    In = 'In',
    ContainsAny = 'ContainsAny',
    Recently = 'Recently',
    // Tariff
    InOther = 'InOther' // This comparison comes with split chart "!@#$"
  }
  
  export type FilterComparisonType =
    | 'Equal'
    | 'NotEqual'
    | 'Bigger'
    | 'BiggerOrEqual'
    | 'Smaller'
    | 'SmallerOrEqual'
    | 'Contains'
    | 'StartsWith'
    | 'EndsWith'
    | 'In'
    | 'ContainsAny'
    | 'Recently'
    | 'InOther';
  
  export interface Filter {
    fieldName: string;
    comparison: FilterComparison;
    fieldValue: string;
  }
  
  export type NvSafeAny = any;
  
  export type INvSizeInputType = 'medium' | 'small' | 'ssmall' | 'xs' | 'xsmall';

  export enum SortDirection {
    ascend = '',
    descend = 'Desc',
    null = 'null'
  }
  // export interface DropdownValue {
  //   label: string;
  //   value: string;
  // }
  