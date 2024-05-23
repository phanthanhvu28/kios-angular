import { Component, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemOptions } from '@models/base-data-list';
import CompanyDto from '@pages/company/models/company.model';
import { CompanyService } from '@pages/company/services';
import { take, timer } from 'rxjs';
import { AbsBaseDataListComponent } from 'src/app/abstracts/components/base-data-list.component';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less'],
  providers: [CompanyService]
})
export class ListComponent extends AbsBaseDataListComponent<CompanyDto> {
  nvSelections: { [key: string]: Array<ItemOptions> } = {};
  constructor(
    el: ElementRef,
    private companyService: CompanyService,
    private router: Router,
    private route: ActivatedRoute,
  ) 
  {
    super(el);  
  }
  protected override getDataListService(): void {
    this.currentTabService = this.companyService;    
  }
  ngAfterViewInit(): void {
    timer(100)
      .pipe(take(1))
      .subscribe(() => {
        this.tableHeight = Utils.getTableHeight(this.el.nativeElement);
        Utils.setTableHeight(this.el.nativeElement, this.tableHeight);
      });
  }
  protected override ngOnInit() {
    super.ngOnInit();
  }

  onFilter(e): void {
    this.setFilterData(e);
  }
  gotoDetail(id): void {
    this.router.navigate(['./', id], {
      relativeTo: this.route
    });
  }

}
