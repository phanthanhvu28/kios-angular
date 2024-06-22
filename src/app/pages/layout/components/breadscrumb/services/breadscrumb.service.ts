import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BreadcrumbData } from 'src/app/models/layout-header';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  public subjectBreadscrumbData = new BehaviorSubject<BreadcrumbData>(null);

  public breadscrumbData$: Observable<BreadcrumbData> =
    this.subjectBreadscrumbData.asObservable();

  public setBreadscrumbData(data: BreadcrumbData): void {
    this.subjectBreadscrumbData.next(data);
  }
}
