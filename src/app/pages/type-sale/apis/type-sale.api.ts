import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataListRequestPayload } from '@models/base-data-list';
import { ResultListModel, ResultModel } from '@models/base/data.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/Environment';
import TypeSaleBaseDto, { DeleteTypeSaleRequest, TypeSaleRequest } from '../models/type-sale.model';

const baseUrl = `${environment.baseUrlKios}/api/v1/type-sale`;
@Injectable({
  providedIn: 'root'
})
export class TypeSaleApi {

  constructor(private _http: HttpClient) {}

    public getAll(
      payload: DataListRequestPayload = {}
    ): Observable<ResultListModel<TypeSaleBaseDto>> {
      return this._http.post<ResultListModel<TypeSaleBaseDto>>(
        `${baseUrl}`,
        payload
      );
    }  
    public create(payload: TypeSaleRequest): Observable<ResultModel<TypeSaleBaseDto>> {
      return this._http.post<ResultModel<TypeSaleBaseDto>>(
        `${baseUrl}/create`,
        payload
      );
    }  
    public update(payload: TypeSaleRequest): Observable<ResultModel<TypeSaleBaseDto>> {
      return this._http.post<ResultModel<TypeSaleBaseDto>>(
        `${baseUrl}/update`,
        payload
      );
    }  
    public delete(payload: DeleteTypeSaleRequest): Observable<ResultModel<string>> {
      return this._http.delete<ResultModel<string>>(`${baseUrl}/delete`,{
        body: {
          code: payload.code
        }
      });
    } 
}
