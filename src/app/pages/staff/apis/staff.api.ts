import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import StaffDto, { DeleteStaffRequest, StaffRequest } from '../models/staff.model';
import { ResultListModel, ResultModel } from '@models/base/data.interface';
import { Observable } from 'rxjs';
import { DataListRequestPayload } from '@models/base-data-list';
import { environment } from 'src/environments/Environment';

const baseUrl = `${environment.baseUrlKios}/api/v1/staff`;
@Injectable({
  providedIn: 'root'
})
export class StaffApi {

  constructor(private _http: HttpClient) {}

    public getAll(
      payload: DataListRequestPayload = {}
    ): Observable<ResultListModel<StaffDto>> {
      return this._http.post<ResultListModel<StaffDto>>(
        `${baseUrl}`,
        payload
      );
    }  
    public create(payload: StaffRequest): Observable<ResultModel<StaffDto>> {
      return this._http.post<ResultModel<StaffDto>>(
        `${baseUrl}/create`,
        payload
      );
    }  
    public update(payload: StaffRequest): Observable<ResultModel<StaffDto>> {
      return this._http.post<ResultModel<StaffDto>>(
        `${baseUrl}/update`,
        payload
      );
    }  
    public delete(payload: DeleteStaffRequest): Observable<ResultModel<string>> {
      return this._http.post<ResultModel<string>>(
        `${baseUrl}/delete`,
        payload
      );
    } 
}
