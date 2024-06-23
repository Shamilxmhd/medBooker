import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddApComponent } from './add-ap.component';

describe('AddApComponent', () => {
  let component: AddApComponent;
  let fixture: ComponentFixture<AddApComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddApComponent]
    });
    fixture = TestBed.createComponent(AddApComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
