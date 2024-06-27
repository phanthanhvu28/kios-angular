import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DataListRequestPayload } from "@models/base-data-list";
import { ResultListModel } from "@models/base/data.interface";
import { Observable } from "rxjs";
import { environment } from "src/environments/Environment";
import CompanyDto from "../models/company.model";
import CompanyRequest from "../models/company.model";


const baseUrl = `${environment.baseUrlKios}/api/v1/company`;
@Injectable({
    providedIn: 'root'
  })
export class ApiCompany{
    constructor(private _http: HttpClient) {}

    public getAll(
      payload: DataListRequestPayload = {}
    ): Observable<ResultListModel<CompanyDto>> {
      return this._http.post<ResultListModel<CompanyDto>>(
        `${baseUrl}`,
        payload
      );
    }
    public create(payload: CompanyRequest): Observable<CompanyRequest> {
      return this._http.post<CompanyRequest>(
        `${baseUrl}/create`,
        payload
      );
    }
}