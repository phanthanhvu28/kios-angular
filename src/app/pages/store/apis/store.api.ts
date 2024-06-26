import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataListRequestPayload } from '@models/base-data-list';
import { ResultListModel } from '@models/base/data.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/Environment';
import StoreDto from '../models/store.model';

const baseUrl = `${environment.baseUrlKios}/api/v1/store`;
@Injectable({
  providedIn: 'root'
})
export class StoreApi {

  constructor(private _http: HttpClient) {}

    public getAll(
      payload: DataListRequestPayload = {}
    ): Observable<ResultListModel<StoreDto>> {
      return this._http.post<ResultListModel<StoreDto>>(
        `${baseUrl}`,
        payload
      );
    }
}
