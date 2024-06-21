import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
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

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

import { Overlay } from '@angular/cdk/overlay';
import { NvMessageService } from '@common-components/base-modal-message/services/nv-message.service';
import { VcErrorInterceptorStrategy } from './strategies/error-interceptor.strategy';
import { ErrorInterceptorStrategy } from './strategies/error-interceptor-base.strategy';
import { StrategyModule } from './strategies/strategy.module';
import { BaseModalMessageModule } from '@common-components/base-modal-message/base-modal-message.module';
import { JwtInterceptorStrategy } from './strategies/jwt-interceptor-base.strategy';
import { VcJwtInterceptorStrategy } from './strategies/jwt-interceptor.strategy';
import { LoginComponent } from './pages/login/login.component';


const BASE_MODULE=[
  CommonModule,
  BrowserAnimationsModule,
  BrowserModule,
  FormsModule,
  HttpClientModule,
  AppRoutingModule,
  
]
const NZ_MODULE=[
  NzButtonModule,
  NzButtonModule, 
  
  NzModalModule,
  NzTabsModule,
  NzStepsModule,
 
  NzLayoutModule,
  NzMenuModule,
  NzResizableModule,
  NzProgressModule,  
  NzNotificationModule,
  NzDrawerModule,
  NzToolTipModule,


]
@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent  
  ],
  imports: [   
    StrategyModule, 
    BaseModalMessageModule,
    ...NZ_MODULE,
    ...BASE_MODULE,
    
  ],
  providers: [AsyncPipe,DatePipe,Title,    
    { provide: NZ_I18N, useValue: en_US },   
    NvMessageService, 
    Overlay,
    {
      provide: JwtInterceptorStrategy,
      useClass: VcJwtInterceptorStrategy
    },
    {
      provide: ErrorInterceptorStrategy,
      useClass: VcErrorInterceptorStrategy
    },
    NzNotificationService,
    NzNoAnimationDirective
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
