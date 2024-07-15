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