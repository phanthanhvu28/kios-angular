import { TableDataCell } from '@models/base-data-list';
export const COMPANY_LIST_COLS: Array<TableDataCell> = [
  {
    title: 'CONTRACT ID ',
    key: 'code',
    width: '160px',
    nzShowSort: true,
    cellRenderClass: 'nv-text-primary-400 nv-pointer',
    formatRenderer: {
      templateID: true
    }
  },
  {
    title: 'CONTRACT NO.',
    key: 'contractNumber',
    width: '160px',
    nzShowSort: true,
    formatRenderer: {
      templateTextLongDotThree: true
    }
  },
  {
    title: 'SUPPLIER',
    key: 'supplierFullName',
    width: '250px',
    nzShowSort: true,
    formatRenderer: {
      templateSupplierName: true
    },
    filterConfigs: {
      type: 'text',
      filterKey: 'supplierCode||supplierShortName||supplierFullName'
    }
  },

  {
    title: 'CREDIT LIMIT',
    key: 'creditLimited',
    width: '150px',
    filterConfigs: {
      type: 'number'
    },
    nzShowSort: true,
    formatRenderer: {
      templateCreditLimited: true
    }
  },
  {
    title: 'CREDIT TERM',
    key: 'creditTerm',
    width: '100px',
    filterConfigs: {
      type: 'number'
    },
    nzShowSort: true,
    formatRenderer: {
      templateCreditTerm: true
    }
  },
  {
    title: 'CONTRACT DURATION',
    key: 'validFrom',
    width: '180px',
    nzShowSort: true,
    formatRenderer: {
      templateContractDuration: true
    },
    filterConfigs: {
      type: 'range-date',
      startRangeKey: 'validFrom',
      endRangeKey: 'validTo'
    }
  },
  {
    title: 'OPEX IN CHARGE',
    key: 'opexFullName',
    width: '200px',
    nzShowSort: true,
    formatRenderer: {
      templateTextLongDotThree: true
    }
  },
  {
    title: 'CREATED BY',
    key: 'createBy',
    width: '150px',
    nzShowSort: true,
    isHidden: true
  },
  {
    title: 'CREATED DATE',
    key: 'createDate',
    width: '120px',
    nzShowSort: true,
    formatRenderer: {
      templateCreatedDate: true
    },
    filterConfigs: {
      type: 'date'
    }
  },
  {
    title: 'STATUS',
    key: 'status',
    width: '120px',
    headerRenderClass: 'nv-text-center nv-justify-center',
    cellRenderClass: 'nv-text-center',
    sortKey: 'sortStatus',
    nzShowSort: true,
    filterConfigs: {
      type: 'selection',
      isMulti: true
    },
    formatRenderer: {
      templateStatus: true
    }
  }
];
