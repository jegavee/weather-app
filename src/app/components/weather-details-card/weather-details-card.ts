import { Component, input, effect, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { IWeather } from '../../models/weather.model';

@Component({
  selector: 'app-weather-details-card',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './weather-details-card.html',
  styleUrl: './weather-details-card.css'
})
export class WeatherDetailsCard {

  getLocalTime(unixTime?: number, timezone?: number): string {
      if (!unixTime || timezone === undefined) {
        return '--'; // fallback if data missing
      }
      const date = new Date((unixTime + timezone) * 1000);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }


  readonly weatherData = input<IWeather>();
  readonly unit = input<'metric' | 'imperial'>('metric');
}
