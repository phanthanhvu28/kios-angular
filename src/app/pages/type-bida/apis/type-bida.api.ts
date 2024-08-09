import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataListRequestPayload } from '@models/base-data-list';
import { ResultListModel, ResultModel } from '@models/base/data.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/Environment';
import  { DeleteTypeBidaRequest, TypeBidaRequest } from '../models/type-bida.model';
import TypeBidaBaseDto from '../models/type-bida.model';

const baseUrl = `${environment.baseUrlKios}/api/v1/type-bida`;
@Injectable({
  providedIn: 'root'
})
export class TypeBidaApi {

  constructor(private _http: HttpClient) {}

    public getAll(
      payload: DataListRequestPayload = {}
    ): Observable<ResultListModel<TypeBidaBaseDto>> {
      return this._http.post<ResultListModel<TypeBidaBaseDto>>(
        `${baseUrl}`,
        payload
      );
    }  
    public create(payload: TypeBidaRequest): Observable<ResultModel<TypeBidaBaseDto>> {
      return this._http.post<ResultModel<TypeBidaBaseDto>>(
        `${baseUrl}/create`,
        payload
      );
    }  
    public update(payload: TypeBidaRequest): Observable<ResultModel<TypeBidaBaseDto>> {
      return this._http.post<ResultModel<TypeBidaBaseDto>>(
        `${baseUrl}/update`,
        payload
      );
    }  
    public delete(payload: DeleteTypeBidaRequest): Observable<ResultModel<string>> {
      return this._http.delete<ResultModel<string>>(`${baseUrl}/delete`,{
        body: {
          code: payload.code
        }
      });
    } 
}
