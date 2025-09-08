import { Component, signal, inject, resource, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Weather } from '../../services/weather/weather';
import { IWeather } from '../../models/weather.model';
import { WeatherSearch } from '../../components/weather-search/weather-search';
import { WeatherCard } from '../../components/weather-card/weather-card';
import { WeatherDetailsCard } from '../../components/weather-details-card/weather-details-card';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    WeatherSearch,
    WeatherCard,
    WeatherDetailsCard
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  private readonly weatherService = inject(Weather);

  city = signal('Makati');
  unit = signal<'metric' | 'imperial'>('metric');

  weatherData = resource<IWeather, void>({
    loader: () => {
      const c = this.city();
      const u = this.unit();

      console.log('Loading weather for:', c, u);
      return this.weatherService.getWeather(c, u);
    }
  });

   constructor() {
    effect(() => {
      const error = this.weatherData.error();
      if (error) {
        console.error('Weather API error:', error);
      }
    });
  }

  onSearch(event: { city: string; unit: 'metric' | 'imperial' }) {
    console.log('onSearch received:', event);
    this.city.set(event.city);
    this.unit.set(event.unit);
    this.weatherData.reload();
  }
}