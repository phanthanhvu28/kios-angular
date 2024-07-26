import { DropdownValue } from "@models/base/data.interface";

export default interface UserDto{
    storeCode: string;
    storeName: string;
    username:string;
    fullname: string;
    address: string;
    email: string;
    phone: string;
    createBy: string;
    createDate: Date;
    updateBy: string;
    updateDate: Date;
    menus: any[]
}
export interface CreateUserRequest{
    storecode: string;    
    username:string;
    fullname: string;
    address: string;
    email: string;
    phone: string;
    menus: any[]
}
export interface UpdateUserRequest{    
    username:string;
    fullname: string;
    address: string;
    email: string;
    phone: string;
    menus: any[]
}
export interface Menus{   
}

export interface DataFilterUser {
    store: Array<DropdownValue>; 
    menus: any[]   
}

export interface DropdownValueStore {
    label: string;
    value: {
      code: string;
      name: string;
    };
}
export interface DeleteUserRequest{  
    username: string;
}