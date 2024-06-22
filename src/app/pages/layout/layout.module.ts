import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { LayoutComponent } from './layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BaseDirectiveModule } from '@directives/directives.module';
import { HeaderComponent } from './components/header/header.component';
import { IconsComponentModule } from '@components/icons-component/icons-component.module';
import { Title } from '@angular/platform-browser';
import { NzInputModule } from 'ng-zorro-antd/input';
import { BreadscrumbComponent } from './components/breadscrumb/breadscrumb.component';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';

@NgModule({
  declarations: [
    LayoutComponent, 
    HeaderComponent, 
    BreadscrumbComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,    
    FormsModule,
    HttpClientModule,
    NzLayoutModule,
    NzMenuModule,
    NzButtonModule,
    NzDropDownModule,
    NzInputModule,
    NzBreadCrumbModule,
    ReactiveFormsModule,
    BaseDirectiveModule,
    IconsComponentModule
  ],
  exports: [LayoutComponent],
  providers: [DatePipe, AsyncPipe, Title]
})
export class LayoutModule { }
