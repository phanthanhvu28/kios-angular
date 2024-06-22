import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import {
  ReplaySubject,
  debounceTime,
  distinctUntilChanged,
  takeUntil
} from 'rxjs';
import { LANGS_MENU_PROVIDER, NOTIFY_ITEMS } from './header.const';
import { DropdownListModel } from '@models/layout-header';
import { AuthService } from '@pages/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent {
  public toggleLangs: boolean = false;
  public toggleUserMenu: boolean = false;
  public toggleNotification: boolean = false;
  public currentUser: any = {};
  public formSearch: FormGroup;

  public selectedFlag: DropdownListModel = LANGS_MENU_PROVIDER[0];

  public readonly notifyItems: Array<any> = NOTIFY_ITEMS;
  public readonly langsProfileMenu: Array<DropdownListModel> =
    LANGS_MENU_PROVIDER;
  public readonly userProfileMenu: Array<DropdownListModel> = [
    {
      title: 'My profile',
      iconSrc: 'user-profile.svg',
      command: () => this.onProfileClick()
    },
    {
      title: 'Log out',
      iconSrc: 'log-out.svg',
      command: () => this.onClickLogout()
    }
  ];
  protected destroy$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(
    private _authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
   // this.currentUser = this._authService._user.profile;
    this.formSearch = this.fb.group({
      searchText: ['']
    });
    this.formSearch.controls.searchText.valueChanges
      .pipe(takeUntil(this.destroy$), debounceTime(200), distinctUntilChanged())
      .subscribe((searchValue) => this.searchNotify(searchValue));
  }

  get searchText(): AbstractControl {
    return this.formSearch.controls['searchText'];
  }

  public onSelectFlag(item: any): void {
    this.selectedFlag = item;
  }

  public onProfileClick(): void {
    console.log('Profile Clicked!!!');
    this.router.navigateByUrl('/profile');
  }

  public onClickLogout(): void {
    console.log('Logout Clicked!!!');    
    this._authService.logout();
  }

  public onClickMarkAllRead(): void {
    console.log('Mark All As Read Clicked!!!');
  }

  public onClickSearch(): void {
    console.log('Search for: ', this.searchText.value);
    this.searchNotify(this.searchText.value);
  }

  public onClickNotifyItem(): void {
    console.log('Clicked Notify item!!! ');
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

  private searchNotify(searchValue: string): void {
    console.log('on Searching Notify...!!!', searchValue);
  }
}
