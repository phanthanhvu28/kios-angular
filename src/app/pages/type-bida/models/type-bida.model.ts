import { DropdownValue } from "@pages/kios/models";

export default interface TypeBidaBaseDto{
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

export interface TypeBidaRequest{
    storeCode: string;  
    staffCode: string;
    code: string;    
    name: string;   
}
export interface DeleteTypeBidaRequest{  
  code: string;  
}

export interface DropdownValueStore {
    label: string;
    value: {
      code: string;
      name: string;
    };
}
export interface DataFilterTypeBida {
    store: Array<DropdownValue>;    
}
