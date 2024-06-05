import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import { ListComponent } from './pages/list/list.component';
import { DetailComponent } from './pages/detail/detail.component';
import { StatusLabelComponent } from './pages/components/status-label/status-label.component';
import { ModalCreateEditCompanyComponent } from './pages/components/modal-create-edit-company/modal-create-edit-company.component';


@NgModule({
  declarations: [
    // ListComponent,
    // DetailComponent 
  
    ModalCreateEditCompanyComponent
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule
  ]
})
export class CompanyModule { }
