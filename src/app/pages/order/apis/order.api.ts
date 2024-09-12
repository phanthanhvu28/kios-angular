import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/Environment';
import { OrderRequest } from '../models';
import { Observable } from 'rxjs';
import OrderDto from '../models/order.model';


const baseUrl = `${environment.baseUrlKios}/api/v1/order`;
@Injectable({
  providedIn: 'root'
})
export class OrderApi {

  constructor(private _http: HttpClient) {}

  public create(payload: OrderRequest): Observable<OrderDto> {
    return this._http.post<OrderDto>(
      `${baseUrl}/create`,
      payload
    );
  }
}
