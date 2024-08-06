import { DropdownValue } from "@models/base/data.interface";

export default interface AreaDto{
    code: string;
    staffCode: string;
    storeCode: string;
    storeName: string;
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

export interface AreaRequest{
  storeCode: string;  
  staffCode: string;  
  code: string;    
  name: string;
  address: string;
  email: string;
  phone: string;    
}
export interface DeleteAreaRequest{  
  code: string;   
 
}

export interface DropdownValueCompany {
    label: string;
    value: {
      code: string;
      name: string;
    };
}
export interface DataFilterArea {
    store: Array<DropdownValue>;    
}
