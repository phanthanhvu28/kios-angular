import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-error-forbidden',
  templateUrl: './page-error-forbidden.component.html',
  styleUrls: ['./page-error-forbidden.component.less']
})
export class PageErrorForbiddenComponent {
  constructor(private router: Router) {}

  onClickBack(): void {
    this.router.navigateByUrl('/');
  }

}
