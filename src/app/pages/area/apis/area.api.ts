import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataListRequestPayload } from '@models/base-data-list';
import { ResultListModel, ResultModel } from '@models/base/data.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/Environment';
import AreaDto, { AreaRequest, DeleteAreaRequest } from '../models/area.model';

const baseUrl = `${environment.baseUrlKios}/api/v1/area`;

@Injectable({
  providedIn: 'root'
})
export class AreaApi {

  constructor(private _http: HttpClient) {}

    public getAll(
      payload: DataListRequestPayload = {}
    ): Observable<ResultListModel<AreaDto>> {
      return this._http.post<ResultListModel<AreaDto>>(
        `${baseUrl}`,
        payload
      );
    }  
    public create(payload: AreaRequest): Observable<ResultModel<AreaDto>> {
      return this._http.post<ResultModel<AreaDto>>(
        `${baseUrl}/create`,
        payload
      );
    }  
    public update(payload: AreaRequest): Observable<ResultModel<AreaDto>> {
      return this._http.post<ResultModel<AreaDto>>(
        `${baseUrl}/update`,
        payload
      );
    }  
    public delete(payload: DeleteAreaRequest): Observable<ResultModel<string>> {
      return this._http.delete<ResultModel<string>>(`${baseUrl}/delete`,{
        body: {
          code: payload.code
        }
      });
    }     
}
