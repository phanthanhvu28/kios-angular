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
export interface Menus{   
}

export interface DataFilterUser {
    store: Array<DropdownValue>; 
    menus: any[]   
}