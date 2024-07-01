import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthApi } from '@pages/auth/api/auth.api';
import { LoginUser } from '@pages/auth/models';
import { AuthService } from '@pages/auth/services/auth.service';
import { catchError, of } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  constructor(private fb: NonNullableFormBuilder,
    private router: Router,
    private authService: AuthService,
    private authApi: AuthApi,
  ) {}
  ngOnInit(): void {
  }

  validateForm: FormGroup<{
    userName: FormControl<string>;
    password: FormControl<string>;
    remember: FormControl<boolean>;
  }> = this.fb.group({
    userName: ['', [Validators.required]],
    password: ['', [Validators.required]],
    remember: [true]
  });

  public submitForm(): void {
    if (this.validateForm.valid) {    
      const payload: LoginUser = 
      {
        username : this.validateForm.value.userName,
        password : this.validateForm.value.password
      };

      this.authService.login(payload);   
      
    } 
    else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  } 
}
