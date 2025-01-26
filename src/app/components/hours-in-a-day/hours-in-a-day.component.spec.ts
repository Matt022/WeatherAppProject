import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoursInADayComponent } from './hours-in-a-day.component';

describe('HoursInADayComponent', () => {
  let component: HoursInADayComponent;
  let fixture: ComponentFixture<HoursInADayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HoursInADayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HoursInADayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
