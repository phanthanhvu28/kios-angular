export default interface CompanyDto{
    code: string;
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

export default interface CompanyRequest{
    code: string;    
    name: string;
    address: string;
    email: string;
    phone: string;    
}