import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowtimeSelector } from './showtime-selector';

describe('ShowtimeSelector', () => {
  let component: ShowtimeSelector;
  let fixture: ComponentFixture<ShowtimeSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowtimeSelector],
    }).compileComponents();

    fixture = TestBed.createComponent(ShowtimeSelector);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
