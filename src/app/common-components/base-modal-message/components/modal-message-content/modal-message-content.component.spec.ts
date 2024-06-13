import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMessageContentComponent } from './modal-message-content.component';

describe('ModalMessageContentComponent', () => {
  let component: ModalMessageContentComponent;
  let fixture: ComponentFixture<ModalMessageContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalMessageContentComponent]
    });
    fixture = TestBed.createComponent(ModalMessageContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
