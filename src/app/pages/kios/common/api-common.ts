import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResultModel } from '@models/base/data.interface';
import { DataFilterArea } from '@pages/area/models';
import { DataFilterStaff } from '@pages/staff/models';
import { DataFilterStore } from '@pages/store/models';
import { DataFilterTable } from '@pages/table/models';
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
}
