import { Component } from '@angular/core';
import { InfoUserBaseComponent } from '@pages/kios/common/info-user-base.component';
import { Observable, ReplaySubject } from 'rxjs';

@Component({
  template: ''
})
export abstract class AbsBaseModalComponent{
  public isActive: boolean = false;
  public size: string | number = 920;
  protected abstract initShow(args?): void;
  protected destroy$: ReplaySubject<boolean> = new ReplaySubject(1);
  show(args?) {
    this.isActive = true;
    this.initShow(args);
  }
  close() {
    this.isActive = false;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
  removeAccents(str: string) {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
      .toLocaleLowerCase()
      .trim();
  }
}
