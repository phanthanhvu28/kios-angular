import { NzTableSortFn } from "ng-zorro-antd/table";
import { Filter, NvSafeAny } from "./base/data.interface";

export interface TableDataCell {
    title?: string;
    key?: string;
    width?: string;
    colSpan?: number;
    rowSpan?: number;
    leftStick?: boolean | string;
    rightStick?: boolean | string;
    headerRenderClass?: string;
    cellRenderClass?: string;
    tooltipClass?: string;
    nzShowSort?: boolean;
    nzSortFn?: boolean | NzTableSortFn<any>;
    nzSortOrder?: string;
    sortOrder?: SortDirection;
    sortKey?: string;
    sortDirections?: string[];
    nzShowFilter?: boolean;
    isFiltering?: boolean;
    nvHidable?: boolean; // default is true
    isHidden?: boolean;
    nvShowTooltip?: boolean; // default is false
    nvEllipsisClaimLine?: number;
    formatRenderer?: any;
    filterConfigs?: FilterCellConfig;
    valueConfig?: LableTemplateConfig;
    titleConfig?: LableTemplateConfig;
    nullable?: boolean;
  }
  
  export interface FilterCellConfig {
    type: 'text' | 'number' | 'date' | 'selection' | 'range-date';
    comparison?: string;
    fieldValue?: FilterValue;
    required?: boolean;
    filterKey?: string;
    // only for Type === 'selection'
    isMulti?: boolean;
    isCustomContent?: boolean;
    formatRendererCell?: any;
    selectionDataKey?: string;
    customSelectionKey?: string;
    nvMaxTagCount?: number;
    splitChat?: string;
    // only for Type === 'range-date'
    startRangeKey?: string;
    endRangeKey?: string;
  }
  
  export type FilterValue =
    | string
    | Array<string | Date>
    | { start: string | number | Date; end: string | number | Date };
  export interface ItemOptions {
    label: string;
    value: string;
    parentValue?: string;
  }
  export enum SortDirection {
    ascend = '',
    descend = 'Desc',
    null = 'null'
  }
  
  export class ProcessFlowModel {
    username: string;
    email: string;
    generalStatus?: string;
    level?: number;
    isApprover?: boolean;
    selfStatus?: null;
    isComplete?: boolean;
    processActionAt?: string;
    nextActionDueDateAt?: string;
    roleDisplayName?: string;
    avatarUrl?: string;
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
    // Tariff
    InOther = 'InOther' // This comparison comes with split chart "!@#$"
  }
  
  export interface DataListRequestPayload {
    includes?: Array<string>;
    filters?: Array<any>;
    sorts?: Array<string>;
    page?: number;
    pageSize?: number;
    filter?: string;
  }
  
  export interface ExportPayload {
    filters?: Array<Filter>;
    sorts?: Array<string>;
    sheetTitle: string;
    columns: Array<string>;
  }
  
  export interface FilterItem {
    fieldName: string;
    comparison: string;
    fieldValue: string | Array<string>;
  }
  
  export interface TableNavConfig {
    nvShowSearch?: boolean;
    nvSearchPosition?: 'right' | 'left' | 'none';
    nvShowFilter?: boolean;
    nvShowDefaultFilter?: boolean;
    nvShowHideCols?: boolean;
    handleClickSearch?: (newState: string) => void;
    handleClickFilter?: (event: Event) => void;
  }
  
  export interface TableRowHighlightConfig {
    when: { [key: string]: string };
    by: string;
    highlightTrigger?: (difDays: number, days: number) => boolean;
  }
  
  export type LabelTemplateParamFn = (data: any) => Array<string>;
  export interface LabelTemplateParams {
    [key: string]: string;
    defaultValue?: string;
    defaultKey?: string;
  }
  
  export interface LableTemplateConfig {
    template: string;
    paramsValue: Array<string> | LabelTemplateParamFn | LabelTemplateParams;
    transform?: {
      [key: number]: (value: NvSafeAny, rowData?: NvSafeAny) => NvSafeAny;
    };
    nullable?: boolean;
  }