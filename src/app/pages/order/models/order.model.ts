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
export interface OrderDetailBaseDto{
    code: string;
    status:string;
    orderCode: string;
    productCode: string;
    productName: string;
    quantity: number;
    UnitPrice: number;
    Amount: number; 
    staffCode: string;
    createDate: Date;
    updateBy: string;
    updateDate: Date;
}

export interface OrderDetailDto{
    order: OrderDto,
    items : OrderDetailBaseDto[]
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