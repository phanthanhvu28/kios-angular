import { TableDataCell } from '@models/base-data-list';
export const LIST_COLS: Array<TableDataCell> = [
  {
    title: 'Product Code',
    key: 'productCode',
    width: '130px',
    nzShowSort: true,
    formatRenderer: {
      templateCode:true
    }
  },
  {
    title: 'Product Name',
    key: 'productName',
    width: '160px',
    nzShowSort: true,
    formatRenderer: {
      templateName:true
      
    }   
  },
  {
    title: 'Quantity',
    key: 'quantity',
    width: '60px',
    headerRenderClass: 'nv-text-center nv-justify-center',
    cellRenderClass: 'nv-text-center',
    nzShowSort: true,
    formatRenderer: {
      templateQty:true
    }   
  },
  {
    title: 'Unit Price',
    key: 'unitPrice',
    width: '70px',
    headerRenderClass: 'nv-text-right nv-justify-end',
    cellRenderClass: 'nv-text-right',
    nzShowSort: true,
    formatRenderer: {
      templatePrice:true
    }   
  },
  {
    title: 'Amount',
    key: 'amount',
    width: '70px',
    headerRenderClass: 'nv-text-right nv-justify-end',
    cellRenderClass: 'nv-text-right',
    nzShowSort: true,
    formatRenderer: {
      templateAmount:true
    }   
  },
  {
    title: 'Actions',
    width: '60px',
    headerRenderClass: 'nv-text-center nv-justify-center',
    cellRenderClass: 'nv-text-center',
    rightStick: true,
    formatRenderer: {
      actionGroup: true
    },
    nzShowFilter: false,
    nzShowSort: false
  },
];
