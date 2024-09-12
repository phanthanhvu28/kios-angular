export default interface OrderDto{
    code: string;
    status:string;
    storeCode: string;
    storeName: string;
    tableCode: string;
    tableName: string;
    totalCost: number;
    OrderDate: Date;
    StartTime: Date;
    EndTime: Date;
    staffCode: string;
    createDate: Date;
    updateBy: string;
    updateDate: Date;
}

export interface OrderRequest{
    orderCode: string;    
    storeCode: string;
    tableCode: string;
    staffCode: string;
    orderDetail: OrderDetailModel;    
}

export interface OrderDetailModel{
    productCode: string;    
    quantity: number;
    unitPrice: number;    
}