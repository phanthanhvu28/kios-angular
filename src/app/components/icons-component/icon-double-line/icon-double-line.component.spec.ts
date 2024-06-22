import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconDoubleLineComponent } from './icon-double-line.component';

describe('IconDoubleLineComponent', () => {
  let component: IconDoubleLineComponent;
  let fixture: ComponentFixture<IconDoubleLineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IconDoubleLineComponent]
    });
    fixture = TestBed.createComponent(IconDoubleLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
