import { Injectable } from '@angular/core';
import { PriceApi } from '../apis';
import { Observable, takeUntil } from 'rxjs';
import { ResultModel } from '@models/base/data.interface';
import PriceBaseDto from '../models/price.model';

@Injectable({
  providedIn: 'root'
})
export class PriceService {

  constructor(private _api: PriceApi) { }

  getPriceByProduct(storeCode: string,productCode: string): Observable<ResultModel<PriceBaseDto>> {
   return this._api.getPriceByProduct(storeCode,productCode);      
  }
}
