import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayInWeekComponent } from './day-in-week.component';

describe('DayInWeekComponent', () => {
  let component: DayInWeekComponent;
  let fixture: ComponentFixture<DayInWeekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DayInWeekComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DayInWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
