import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzModalModule } from 'ng-zorro-antd/modal'
import {
  NzNotificationModule,
  NzNotificationService
} from 'ng-zorro-antd/notification';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzResizableModule } from 'ng-zorro-antd/resizable';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

import { HttpClientModule } from '@angular/common/http';
import { AsyncPipe } from '@angular/common';




const BASE_MODULE=[
  // BaseTableModule,
]
const NZ_MODULE=[
  NzButtonModule,
  NzButtonModule,

  FormsModule,
  NzModalModule,
  NzTabsModule,
  NzStepsModule,
 
  NzLayoutModule,
  NzMenuModule,
  NzResizableModule,
  NzProgressModule,  
  NzNotificationModule,
]
@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent             
  ],
  imports: [
    BrowserModule,        
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,    
    ...NZ_MODULE,
    ...BASE_MODULE
  ],
  providers: [AsyncPipe,
    { provide: NZ_I18N, useValue: en_US },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
