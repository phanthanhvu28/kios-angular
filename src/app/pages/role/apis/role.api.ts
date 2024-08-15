import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataListRequestPayload } from '@models/base-data-list';
import { ResultListModel, ResultModel } from '@models/base/data.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/Environment';
import RoleDto, { CreateRoleRequest, DeleteRoleRequest, UpdateRoleRequest } from '../models/role.model';

const baseUrl = `${environment.baseUrlKios}/api/v1/role`;
@Injectable({
  providedIn: 'root'
})
export class RoleApi {

  constructor(private _http: HttpClient) { }

  public getAll(
    payload: DataListRequestPayload = {}
  ): Observable<ResultListModel<RoleDto>> {
    return this._http.post<ResultListModel<RoleDto>>(
      `${baseUrl}`,
      payload
    );
  }  
  public create(payload: CreateRoleRequest): Observable<ResultModel<RoleDto>> {
    return this._http.post<ResultModel<RoleDto>>(
      `${baseUrl}/create`,
      payload
    );
  }
  public update(payload: UpdateRoleRequest): Observable<ResultModel<RoleDto>> {
    return this._http.post<ResultModel<RoleDto>>(
      `${baseUrl}/update`,
      payload
    );
  } 
  public delete(payload: DeleteRoleRequest): Observable<ResultModel<string>> {
    return this._http.delete<ResultModel<string>>(`${baseUrl}/delete`,{
      body: {
        code: payload.code
      }
    });
  } 
}
