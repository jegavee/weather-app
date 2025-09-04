import { Component, input, effect, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { IWeather } from '../../models/weather.model';

@Component({
  selector: 'app-weather-card',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './weather-card.html',
  styleUrl: './weather-card.css'
})
export class WeatherCard {
  readonly weatherData = input<IWeather>();
  readonly unit = input<'metric' | 'imperial'>('metric');
}