import { DropdownValue } from "@pages/kios/models";

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
    roles: string[]
    modelRoles: any[]
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
export interface ResetPassRequest{    
    username:string;
    password: string;
    confirmedPass: string;
}
export interface UpdateMenuRequest{    
    username:string;  
    menus: any[]
}
export interface UpdateRoleRequest{    
    username:string;  
    roles: string[]
}
export interface Menus{   
}

export interface DataFilterUser {
    store: Array<DropdownValue>; 
    menus: any[],
    roles: any[]   
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
export interface FilterRoleModel{  
    code: string;
    name: string;
}