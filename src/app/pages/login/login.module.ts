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
    NzIconModule
  ]
})
export class LoginModule { }
