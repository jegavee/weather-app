import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherDetailsCard } from './weather-details-card';

describe('WeatherDetailsCard', () => {
  let component: WeatherDetailsCard;
  let fixture: ComponentFixture<WeatherDetailsCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherDetailsCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherDetailsCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
