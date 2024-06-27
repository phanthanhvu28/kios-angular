import { Component, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@pages/auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'kios-angular';
  public userAuthenticated = false;
  isCollapsed = false;
  constructor(
    private _authService: AuthService,
    private router: Router
  ){
    // console.log("isAuthenticated", this._authService.isAuthenticated());
    // if(!this._authService.isAuthenticated()){
    //   const url = `/login`;
    //   this.router.navigate([url]);
    // }
  } 
}
