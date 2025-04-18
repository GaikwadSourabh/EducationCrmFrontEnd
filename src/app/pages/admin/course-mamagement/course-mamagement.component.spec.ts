import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseMamagementComponent } from './course-mamagement.component';

describe('CourseMamagementComponent', () => {
  let component: CourseMamagementComponent;
  let fixture: ComponentFixture<CourseMamagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseMamagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseMamagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
