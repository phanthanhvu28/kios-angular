import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataListRequestPayload } from '@models/base-data-list';
import { ResultListModel } from '@models/base/data.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/Environment';
import UserDto from '../models/user.model';

const baseUrl = `${environment.baseUrlKios}/api/v1/authen`;
@Injectable({
  providedIn: 'root'
})
export class UserApi {

  constructor(private _http: HttpClient) { }

  public getAll(
    payload: DataListRequestPayload = {}
  ): Observable<ResultListModel<UserDto>> {
    return this._http.post<ResultListModel<UserDto>>(
      `${baseUrl}/user`,
      payload
    );
  }  
}
