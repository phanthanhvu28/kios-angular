export default interface PriceBaseDto{
    code: string;
    staffCode: string;
    storeCode: string;
    storeName: string;
    validFrom: Date;
    validTo: Date;
    unitPrice: number;
    status:string;    
    createBy: string;
    createDate: Date;
    updateBy: string;
    updateDate: Date;
}