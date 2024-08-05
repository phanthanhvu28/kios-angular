import { DropdownValue } from "@models/base/data.interface";

export default interface StaffDto{
    code: string;
    storeCode: string;
    storeName: string;
    status:string;
    fullName: string;
    address: string;
    email: string;
    phone: string;
    createBy: string;
    createDate: Date;
    updateBy: string;
    updateDate: Date;
}

export interface StaffRequest{
    storeCode: string;  
  code: string;    
  name: string;
  address: string;
  email: string;
  phone: string;    
}
export interface DeleteStaffRequest{  
  code: string;   
 
}

export interface DropdownValueCompany {
    label: string;
    value: {
      code: string;
      name: string;
    };
}
export interface DataFilterStaff {
    store: Array<DropdownValue>;    
}
