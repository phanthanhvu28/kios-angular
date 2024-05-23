import { TableDataCell } from '@models/base-data-list';
export const COMPANY_LIST_COLS: Array<TableDataCell> = [
  {
    title: '',
    width: '44px',
    formatRenderer: {
      selection: true
    },
    nzShowFilter: false,
    nzShowSort: false,
    nvHidable: false
  },
  {
    title: 'CODE ',
    key: 'code',
    width: '160px',
    nzShowSort: true,
    cellRenderClass: 'nv-text-primary-400 nv-pointer',
    formatRenderer: {
      templateID: true
    }
  },
  {
    title: 'NAME',
    key: 'name',
    width: '160px',
    nzShowSort: true,
    formatRenderer: {
      templateName: true
    }
  },
  {
    title: 'ADDRESS',
    key: 'address',
    width: '250px',
    nzShowSort: true,
    formatRenderer: {
      templateAddress: true
    }   
  },
  {
    title: 'EMAIL',
    key: 'email',
    width: '250px',
    nzShowSort: true,
    formatRenderer: {
      templateEmail: true
    }   
  },
  {
    title: 'PHONE',
    key: 'phone',
    width: '150px',    
    nzShowSort: true,
    formatRenderer: {
      templatePhone: true
    }
  },  
  {
    title: 'CREATED BY',
    key: 'createBy',
    width: '150px',
    nzShowSort: true    ,
    formatRenderer: {
      templateCreateBy: true
    }
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
  }  
];
