import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseTableNavComponent } from './base-table-nav.component';

describe('BaseTableNavComponent', () => {
  let component: BaseTableNavComponent;
  let fixture: ComponentFixture<BaseTableNavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BaseTableNavComponent]
    });
    fixture = TestBed.createComponent(BaseTableNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
