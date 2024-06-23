import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteApComponent } from './delete-ap.component';

describe('DeleteApComponent', () => {
  let component: DeleteApComponent;
  let fixture: ComponentFixture<DeleteApComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteApComponent]
    });
    fixture = TestBed.createComponent(DeleteApComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
