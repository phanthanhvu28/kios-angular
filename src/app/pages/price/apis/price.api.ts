import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResultModel } from '@models/base/data.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/Environment';
import PriceBaseDto from '../models/price.model';

const baseUrl = `${environment.baseUrlKios}/api/v1/price`;
@Injectable({
  providedIn: 'root'
})
export class PriceApi {

  constructor(private _http: HttpClient) { }

  public getPriceByProduct(storeCode: string, productCode:string): Observable<ResultModel<PriceBaseDto>> {
    return this._http.get<ResultModel<PriceBaseDto>>(
      `${baseUrl}/${storeCode}/${productCode}`
    );
  }
}
