import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataListRequestPayload } from '@models/base-data-list';
import { ResultListModel, ResultModel } from '@models/base/data.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/Environment';
import ProductDto, { DeleteProductRequest,  ProductRequest } from '../models/product.model';

const baseUrl = `${environment.baseUrlKios}/api/v1/product`;
@Injectable({
  providedIn: 'root'
})
export class ProductApi {

  constructor(private _http: HttpClient) {}

    public getAll(
      payload: DataListRequestPayload = {}
    ): Observable<ResultListModel<ProductDto>> {
      return this._http.post<ResultListModel<ProductDto>>(
        `${baseUrl}`,
        payload
      );
    }  
    public create(payload: ProductRequest): Observable<ResultModel<ProductDto>> {
      return this._http.post<ResultModel<ProductDto>>(
        `${baseUrl}/create`,
        payload
      );
    }  
    public update(payload: ProductRequest): Observable<ResultModel<ProductDto>> {
      return this._http.post<ResultModel<ProductDto>>(
        `${baseUrl}/update`,
        payload
      );
    }     
    public delete(payload: DeleteProductRequest): Observable<ResultModel<string>> {
      return this._http.delete<ResultModel<string>>(`${baseUrl}/delete`,{
        body: {
          code: payload.code
        }
      });
    } 
}
