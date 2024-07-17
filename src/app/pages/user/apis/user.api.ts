import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataListRequestPayload } from '@models/base-data-list';
import { ResultListModel, ResultModel } from '@models/base/data.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/Environment';
import UserDto, { CreateUserRequest, DeleteUserRequest } from '../models/user.model';

const baseUrl = `${environment.baseUrlKios}/api/v1/authen`;
@Injectable({
  providedIn: 'root'
})
export class UserApi {

  constructor(private _http: HttpClient) { }

  public getAll(
    payload: DataListRequestPayload = {}
  ): Observable<ResultListModel<UserDto>> {
    return this._http.post<ResultListModel<UserDto>>(
      `${baseUrl}/user`,
      payload
    );
  }  
  public create(payload: CreateUserRequest): Observable<ResultModel<CreateUserRequest>> {
    return this._http.post<ResultModel<CreateUserRequest>>(
      `${baseUrl}/create`,
      payload
    );
  }
  public delete(payload: DeleteUserRequest): Observable<ResultModel<string>> {
    return this._http.delete<ResultModel<string>>(`${baseUrl}/delete`,{
      body: {
        username: payload.username
      }
    });
  } 
}
