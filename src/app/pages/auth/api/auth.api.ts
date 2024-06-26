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

  public loginApi(payload: LoginUser): Observable<ResultModel<AuthenUserDto>> 
  {
      console.log("payloadAPI",payload);
      console.log("baseUrl",`${baseUrl}/login`);    
      return this._http.post<ResultModel<AuthenUserDto>>(
        `${baseUrl}/login`,
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
