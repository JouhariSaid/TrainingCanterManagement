import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingRequestsComponent } from './training-requests.component';

describe('TrainingRequestsComponent', () => {
  let component: TrainingRequestsComponent;
  let fixture: ComponentFixture<TrainingRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
