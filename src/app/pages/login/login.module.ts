import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { LoginComponent } from './login.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { LoginRoutingModule } from './login-routing.module';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule } from '@angular/forms';
import { IconsComponentModule } from '@components/icons-component/icons-component.module';
import { BaseButtonModule } from '@common-components/base-button/base-button.module';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [LoginComponent],
  imports: [    
    FormsModule,
    LoginRoutingModule,
    CommonModule,
    NzLayoutModule,
    NzFormModule,
    NzInputModule,
    ReactiveFormsModule,
    NzButtonModule ,
    NzIconModule,
    IconsComponentModule,
    BaseButtonModule,
    HttpClientModule
  ]
})
export class LoginModule { }
