import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataListRequestPayload } from '@models/base-data-list';
import { ResultListModel, ResultModel } from '@models/base/data.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/Environment';
import TableBaseDto, { DeleteTableRequest, TableRequest } from '../models/table.model';

const baseUrl = `${environment.baseUrlKios}/api/v1/table`;
@Injectable({
  providedIn: 'root'
})
export class TableApi {

  constructor(private _http: HttpClient) {}

    public getAll(
      payload: DataListRequestPayload = {}
    ): Observable<ResultListModel<TableBaseDto>> {
      return this._http.post<ResultListModel<TableBaseDto>>(
        `${baseUrl}`,
        payload
      );
    }  
    public create(payload: TableRequest): Observable<ResultModel<TableBaseDto>> {
      return this._http.post<ResultModel<TableBaseDto>>(
        `${baseUrl}/create`,
        payload
      );
    }  
    public update(payload: TableRequest): Observable<ResultModel<TableBaseDto>> {
      return this._http.post<ResultModel<TableBaseDto>>(
        `${baseUrl}/update`,
        payload
      );
    }  
    public delete(payload: DeleteTableRequest): Observable<ResultModel<string>> {
      return this._http.delete<ResultModel<string>>(`${baseUrl}/delete`,{
        body: {
          code: payload.code
        }
      });
    } 
}
