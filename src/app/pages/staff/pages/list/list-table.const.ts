import { TableDataCell } from '@models/base-data-list';
export const LIST_COLS: Array<TableDataCell> = [
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
    title: 'FULL NAME',
    key: 'fullName',
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
  },
  // {
  //   title: 'STATUS',
  //   key: 'status',
  //   width: '120px',
  //   headerRenderClass: 'nv-text-center nv-justify-center',
  //   cellRenderClass: 'nv-text-center',
  //   sortKey: 'Status',
  //   nzShowSort: true,
  //   filterConfigs: {
  //     type: 'selection',
  //     isMulti: false
  //   },
  //   formatRenderer: {
  //     templateStatus: true
  //   }
  // }
  {
    title: 'Actions',
    width: '100px',
    headerRenderClass: 'nv-text-center nv-justify-center',
    rightStick: true,
    formatRenderer: {
      actionGroup: true
    },
    nzShowFilter: false,
    nzShowSort: false
  },
];
