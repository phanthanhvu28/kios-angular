import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/Environment';
import { AuthenUserDto, LoginUser } from '../models';
import { ResultListModel, ResultModel } from '@models/base/data.interface';
import { DataListRequestPayload } from '@models/base-data-list';
import CompanyDto from '@pages/company/models/company.model';
const baseUrl = `http://localhost:6001/api/v1/authen`;
//const baseUrl1 = `${environment.baseUrlKios}/api/v1/authen`;
//const baseUrl = `${environment.config.API_URL.KIOS.BASE_URL}/api/v1/company`;
@Injectable({
  providedIn: 'root'
})

export class AuthApi {
  
  constructor(private _http: HttpClient) {}

  public getAll(): Observable<ResultListModel<CompanyDto>> {
    const payload: DataListRequestPayload = 
    { 
      "page": 1,
      "pageSize": 10
    }
    return this._http.post<ResultListModel<CompanyDto>>(
      `http://localhost:6001/api/v1/company`,
      payload
    );
  }

  public loginApi(payload: LoginUser): Observable<ResultModel<AuthenUserDto>> 
  {
      console.log("payloadAPI",payload);
      console.log("baseUrl",`${baseUrl}/login`);
     // console.log("baseUrl1",`${baseUrl1}`);

      // return this._http.post<any>(`${baseUrl}/login`, payload);

      return this._http.post<ResultModel<AuthenUserDto>>(
        "http://localhost:6001/api/v1/authen/login",
        payload); 

  }
  // onCatchException(
  //     catchFuncName: string = 'login',
  //     requestData: any = {}
  //   ) 
  // {
  //     return catchError((err) => {
  //       const message =
  //         Date.now().toString() + '_' + 'Could not load ' + catchFuncName;
  //       localStorage.setItem(message, JSON.stringify({ err, requestData }));
  //       return throwError(() => (err.error ? err.error : err));
  //     });
  // }
}
