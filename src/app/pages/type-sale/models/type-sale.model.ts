import { DropdownValue } from "@models/base/data.interface";

export default interface TypeSaleBaseDto{
    code: string;
    staffCode: string;
    storeCode: string;
    storeName: string;
    status:string;
    name: string;  
    createBy: string;
    createDate: Date;
    updateBy: string;
    updateDate: Date;
}

export interface TypeSaleRequest{
    storeCode: string;  
    staffCode: string;
    code: string;    
    name: string;   
}
export interface DeleteTypeSaleRequest{  
  code: string;  
}

export interface DropdownValueStore {
    label: string;
    value: {
      code: string;
      name: string;
    };
}
export interface DataFilterTypeSale {
    store: Array<DropdownValue>;    
}
