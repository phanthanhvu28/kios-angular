import { Component } from '@angular/core';
import CompanyDto from '@pages/company/models/company.model';
import { AbsBaseDataListComponent } from 'src/app/abstracts/components/base-data-list.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent extends AbsBaseDataListComponent<CompanyDto> {
  protected override getDataListService(): void {
    throw new Error('Method not implemented.');
  }

}
