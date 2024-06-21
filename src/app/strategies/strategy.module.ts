import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ErrorInterceptorStrategy, JwtInterceptorStrategy } from './strategies';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule
} from '@angular/common/http';
// import { JwtInterceptor } from './interceptors/jwt.interceptor';
// import { ErrorInterceptor } from './interceptors/error.interceptor';
// import { ContextInterceptor } from './interceptors/context.interceptor';
// import { ContextInterceptorStrategy } from './strategies/context-interceptor.strategy';
import { ErrorInterceptorStrategy } from './error-interceptor-base.strategy';
import { ContextInterceptor } from './interceptors/context.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { ContextInterceptorStrategy } from './context-interceptor.strategy';
import { JwtInterceptorStrategy } from './jwt-interceptor-base.strategy';
import { JwtInterceptor } from './interceptors/jwt.interceptor';

const INTERCEPTORS = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ContextInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [
    JwtInterceptorStrategy,
    ErrorInterceptorStrategy,
    ContextInterceptorStrategy,
    ...INTERCEPTORS
  ]
})
export class StrategyModule {
  constructor(@Optional() @SkipSelf() coreModule: StrategyModule) {
    if (coreModule) {
      throw new Error(
        'CoreModule is already loaded. Import CoreModule in AppModule only.'
      );
    }
  }
}
