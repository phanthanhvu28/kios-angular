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

  passwordVisible: boolean = false;
  emailValidStt: string = '';
  languages = [
    { value: 'en', label: 'English' },
    { value: 'vi', label: 'Tiếng Việt' },
  ];
  currentLanguage: string = 'en';

  constructor(private fb: NonNullableFormBuilder,
    private router: Router,
    private authService: AuthService,
    private authApi: AuthApi,
  ) {}
  ngOnInit(): void {
    this.currentLanguage = localStorage.getItem('lang') || 'en';
    console.log("language",this.currentLanguage)
  }

  loginForm: FormGroup<{
    userName: FormControl<string>;
    password: FormControl<string>;
    remember: FormControl<boolean>;
  }> = this.fb.group({
    userName: ['', [Validators.required]],
    password: ['', [Validators.required]],
    remember: [true]
  });

  public submitForm(): void {
    if (this.loginForm.valid) {    
      const payload: LoginUser = 
      {
        username : this.loginForm.value.userName,
        password : this.loginForm.value.password
      };

      this.authService.login(payload);   
      
    } 
    else {
      this.refreshForm()
      // Object.values(this.loginForm.controls).forEach(control => {
      //   if (control.invalid) {
      //     control.markAsDirty();
      //     control.updateValueAndValidity({ onlySelf: true });
      //   }
      // });
    }
  } 

  refreshForm(controlName: any = null) {
    if (controlName != null) {
      this.loginForm.controls[controlName].markAsDirty();
      this.loginForm.controls[controlName].updateValueAndValidity({
        onlySelf: true,
      });
    } else {
      Object.values(this.loginForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  goToForgotPassWord() {
    //this.router.navigate(['account/forgot-password']);
  }
  goToRegister() {
    //this.router.navigate(['account/register']);
  }
  onLanguageChanged(language: string): void {
    this.currentLanguage = language;
  }
  onC2(){
    console.log("Cherry pick C2")
  }
}
