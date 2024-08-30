import { DropdownValue } from "@pages/kios/models";

export default interface TableBaseDto{
    code: string;
    staffCode: string;
    storeCode: string;
    storeName: string;
    areaCode: string;
    areaName: string;
    typeSaleCode: string;  
    typeSaleName: string;  
    typeBidaCode: string;  
    typeBidaName: string;  

    status:string;
    name: string;
    address: string;
    email: string;
    phone: string;
    createBy: string;
    createDate: Date;
    updateBy: string;
    updateDate: Date;
}

export interface TableRequest{
  storeCode: string;  
  staffCode: string;  
  areaCode: string;  
  typeSaleCode: string;  
  typeBidaCode: string;  
  code: string;    
  name: string;
  address: string;
  email: string;
  phone: string;    
}
export interface DeleteTableRequest{  
  code: string;   
 
}

export interface DropdownValueCompany {
    label: string;
    value: {
      code: string;
      name: string;
    };
}
export interface DataFilterTable {
    store: Array<DropdownValue>;    
    area: Array<DropdownValue>;    
    typeSale: Array<DropdownValue>;    
    typeBida: Array<DropdownValue>;    
}
