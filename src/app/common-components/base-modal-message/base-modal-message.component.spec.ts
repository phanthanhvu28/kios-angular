import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseModalMessageComponent } from './base-modal-message.component';

describe('BaseModalMessageComponent', () => {
  let component: BaseModalMessageComponent;
  let fixture: ComponentFixture<BaseModalMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BaseModalMessageComponent]
    });
    fixture = TestBed.createComponent(BaseModalMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
