import { TableDataCell } from '@models/base-data-list';
export const LIST_COLS: Array<TableDataCell> = [
  {
    title: '',
    width: '20px',
    formatRenderer: {
      selection: true
    },
    nzShowFilter: false,
    nzShowSort: false,
    nvHidable: false
  },  
  {
    title: 'name',
    key: 'name',
    width: '150px',
    nzShowSort: true,
    formatRenderer: {
      templateName: true
    }
  },
  {
    title: 'CREATED BY',
    key: 'createBy',
    width: '100px',
    nzShowSort: true    ,
    formatRenderer: {
      templateCreateBy: true
    }
  },
  {
    title: 'CREATED DATE',
    key: 'createDate',
    width: '100px',
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
    width: '40px',
    headerRenderClass: 'nv-text-center nv-justify-center',
    rightStick: true,
    formatRenderer: {
      actionGroup: true
    },
    nzShowFilter: false,
    nzShowSort: false
  },
];
