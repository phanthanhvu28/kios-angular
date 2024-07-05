import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResultModel } from '@models/base/data.interface';
import { DataFilterStore } from '@pages/store/models';
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
}
