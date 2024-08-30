import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResultModel } from '@models/base/data.interface';
import { DataFilterArea } from '@pages/area/models';
import { DataFilterProduct } from '@pages/product/models';
import { DataFilterRole } from '@pages/role/models';
import { DataFilterStaff } from '@pages/staff/models';
import { DataFilterStore } from '@pages/store/models';
import { DataFilterTable } from '@pages/table/models';
import { DataFilterTypeBida } from '@pages/type-bida/models';
import { DataFilterTypeSale } from '@pages/type-sale/models';
import { DataFilterUser } from '@pages/user/models';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/Environment';

const baseUrl = `${environment.baseUrlKios}/api/v1/filter`;
@Injectable({
  providedIn: 'root'
})
export class ApiCommon {

  constructor(private _http: HttpClient) { }

  public filterCompany(    
  ) : Observable<ResultModel<DataFilterStore>> {
    return this._http.post<ResultModel<DataFilterStore>>(
      `${baseUrl}/company`,{}  
    );
  }
  public filterUser(    
  ) : Observable<ResultModel<DataFilterUser>> {
    return this._http.post<ResultModel<DataFilterUser>>(
      `${baseUrl}/user`,{}  
    );
  } 
  public filterRole(    
  ) : Observable<ResultModel<DataFilterRole>> {
    return this._http.post<ResultModel<DataFilterRole>>(
      `${baseUrl}/role`,{}  
    );
  } 
  public filterStaff(    
  ) : Observable<ResultModel<DataFilterStaff>> {
    return this._http.post<ResultModel<DataFilterStaff>>(
      `${baseUrl}/staff`,{}  
    );
  } 
  public filterArea(    
  ) : Observable<ResultModel<DataFilterArea>> {
    return this._http.post<ResultModel<DataFilterArea>>(
      `${baseUrl}/area`,{}  
    );
  } 
  public filterTable(    
  ) : Observable<ResultModel<DataFilterTable>> {
    return this._http.post<ResultModel<DataFilterTable>>(
      `${baseUrl}/table`,{}  
    );
  } 
  public filterTypeSale(    
  ) : Observable<ResultModel<DataFilterTypeSale>> {
    return this._http.post<ResultModel<DataFilterTypeSale>>(
      `${baseUrl}/type-sale`,{}  
    );
  } 
  public filterTypeBida(    
  ) : Observable<ResultModel<DataFilterTypeBida>> {
    return this._http.post<ResultModel<DataFilterTypeBida>>(
      `${baseUrl}/type-bida`,{}  
    );
  } 
  public filterProduct(    
  ) : Observable<ResultModel<DataFilterProduct>> {
    return this._http.post<ResultModel<DataFilterProduct>>(
      `${baseUrl}/product`,{}  
    );
  }
}
