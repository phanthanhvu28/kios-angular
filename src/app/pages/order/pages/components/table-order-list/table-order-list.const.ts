import { TableDataCell } from '@models/base-data-list';
export const LIST_COLS: Array<TableDataCell> = [
  {
    title: 'Product Code',
    key: 'productCode',
    width: '70px',
    nzShowSort: true,
    formatRenderer: {
      templateCode:true
    }
  },
  {
    title: 'Product Name',
    key: 'productName',
    width: '150px',
    nzShowSort: true,
    formatRenderer: {
      templateName:true
      
    }   
  },
  {
    title: 'Quantity',
    key: 'quantity',
    width: '70px',
    headerRenderClass: 'nv-text-center nv-justify-center',
    cellRenderClass: 'nv-text-center nv-max-width-132',
    nzShowSort: true,
    formatRenderer: {
      templateQty:true
    }   
  },
  {
    title: 'Unit Price',
    key: 'unitPrice',
    width: '100px',
    nzShowSort: true,
    formatRenderer: {
      templatePrice:true
    }   
  },
  {
    title: 'Amount',
    key: 'amount',
    width: '100px',
    nzShowSort: true,
    formatRenderer: {
      templateAmount:true
    }   
  },
  {
    title: 'Actions',
    width: '70px',
    headerRenderClass: 'nv-text-center nv-justify-center',
    rightStick: true,
    formatRenderer: {
      actionGroup: true
    },
    nzShowFilter: false,
    nzShowSort: false
  },
];
