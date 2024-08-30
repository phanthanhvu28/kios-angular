import { DropdownValue } from "@pages/kios/models";

export default interface ProductDto{
    code: string;
    storeCode: string;
    storeName: string;
    status:string;
    name: string;
    staffCode: string;
    typeSaleCode: string;
    typeSaleName: string;
    typeBidaCode: string;
    typeBidaName: string;
    createBy: string;
    createDate: Date;
    updateBy: string;
    updateDate: Date;
}

export interface ProductRequest{
  code: string;    
  name: string;
  storeCode: string;
  typeSaleCode: string;
  typeBidaCode: string;    
}
export interface DeleteProductRequest{  
  code: string;   
 
}

export interface DropdownValueCompany {
    label: string;
    value: {
      code: string;
      name: string;
    };
}

export interface DataFilterProduct {
  store: Array<DropdownValue>;    
  typeSale: Array<DropdownValue>;    
  typeBida: Array<DropdownValue>;    
}
