import { Component, signal, inject, resource, effect, computed } from '@angular/core';
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

  city = signal('');
  unit = signal<'metric' | 'imperial'>('metric');
  
  private searchParams = computed(() => ({
    city: this.city(),
    unit: this.unit()
  }));

  weatherData = resource<IWeather, void>({
    loader: async () => {
      const params = this.searchParams();
      const { city: c, unit: u } = params;

      if (!c) {
        return Promise.resolve(null as any);
      }

      try {
        const result = await this.weatherService.getWeather(c, u);
        return result;
      } catch (error) {
        let errorMessage = `Weather data not found for "${c}"`;
        
        if (error && typeof error === 'object' && 'status' in error) {
          const httpError = error as any;
          if (httpError.status === 404) {
            errorMessage = `City "${c}" not found`;
          } else if (httpError.error?.message) {
            errorMessage = httpError.error.message;
          } else {
            errorMessage = `API error: ${httpError.status} ${httpError.statusText || 'Unknown error'}`;
          }
        } else if (error instanceof Error) {
          errorMessage = error.message;
        }
        
        throw new Error(errorMessage);
      }
    }
  });

  constructor() {
    effect(() => {
      const error = this.weatherData.error();
      if (error) {
        console.error('Weather Resource error:', error);
      }
    });
  }

  onSearch(event: { city: string; unit: 'metric' | 'imperial' }) {
    this.city.set(event.city);
    this.unit.set(event.unit);
    this.weatherData.reload();
  }
}