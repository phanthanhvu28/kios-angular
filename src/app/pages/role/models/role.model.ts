import { DropdownValue } from "@models/base/data.interface";

export default interface RoleDto{
    code: string;
    name: string;    
    createBy: string;
    createDate: Date;
    updateBy: string;
    updateDate: Date;
    menus: any[]
}
export interface CreateRoleRequest{
    name: string;        
    menus: any[]
}
export interface UpdateRoleRequest{    
    code:string;
    name: string;    
    menus: any[]
}

export interface DataFilterRole {   
    menus: any[]   
}

export interface DropdownValueStore {
    label: string;
    value: {
      code: string;
      name: string;
    };
}
export interface DeleteRoleRequest{  
    code: string;
}

export interface NodeParent {
    title:    string;
    key:      string;
    expanded: boolean;
    children: NodeChild[];
}

export interface NodeChild {
    title:    string;
    key:      string;
    expanded: boolean;
    children: ChildChild[];
}

export interface ChildChild {
    title:  string;
    key:    string;
    isLeaf: boolean;
}