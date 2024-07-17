import { DropdownValue } from "@models/base/data.interface";

export default interface StoreDto{
    code: string;
    companyCode: string;
    companyName: string;
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

export interface StoreRequest{
  companyCode: string;  
  code: string;    
  name: string;
  address: string;
  email: string;
  phone: string;    
}
export interface DeleteStoreRequest{  
  code: string;   
 
}

export interface DropdownValueCompany {
    label: string;
    value: {
      code: string;
      name: string;
    };
}
export interface DataFilterStore {
    company: Array<DropdownValue>;    
}
