import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/Environment';
import { OrderRequest } from '../models';
import { Observable } from 'rxjs';
import OrderDto, { OrderDetailDto } from '../models/order.model';
import { ResultModel } from '@models/base/data.interface';


const baseUrl = `${environment.baseUrlKios}/api/v1/order`;
@Injectable({
  providedIn: 'root'
})
export class OrderApi {

  constructor(private _http: HttpClient) {}

  public create(payload: OrderRequest): Observable<ResultModel<OrderDto>> {
    return this._http.post<ResultModel<OrderDto>>(
      `${baseUrl}/create`,
      payload
    );
  }

  public detail(orderCode: string): Observable<ResultModel<OrderDetailDto>> {
    return this._http.get<ResultModel<OrderDetailDto>>(
      `${baseUrl}/${orderCode}`,      
    );  
  }
}
