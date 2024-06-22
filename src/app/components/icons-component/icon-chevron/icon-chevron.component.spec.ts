import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconChevronComponent } from './icon-chevron.component';

describe('IconChevronComponent', () => {
  let component: IconChevronComponent;
  let fixture: ComponentFixture<IconChevronComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IconChevronComponent]
    });
    fixture = TestBed.createComponent(IconChevronComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
