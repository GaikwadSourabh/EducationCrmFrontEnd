import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackPageComponent } from './feedback.component';

describe('FeedbackComponent', () => {
  let component: FeedbackPageComponent;
  let fixture: ComponentFixture<FeedbackPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedbackPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedbackPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
