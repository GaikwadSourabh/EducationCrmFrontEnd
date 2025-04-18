import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellCourseComponent } from './sell-course.component';

describe('SellCourseComponent', () => {
  let component: SellCourseComponent;
  let fixture: ComponentFixture<SellCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellCourseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
