import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Weather } from '../../services/weather/weather';
import { IWeather } from '../../models/weather.model';

@Component({
  selector: 'app-weather-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './weather-search.html',
  styleUrl: './weather-search.css'
})
export class WeatherSearch {
  city = '';
  unit: 'metric' | 'imperial' = 'metric';
  loading = false;
  error = '';

  constructor(private weatherService: Weather) {}

  @Output() weatherFound = new EventEmitter<{ data: IWeather | undefined, unit: 'metric' | 'imperial' }>();

  async search() {
    if (!this.city) return;
    this.loading = true;
    this.error = '';
    try {
      const weatherData = await this.weatherService.getWeather(this.city, this.unit);
      console.log(weatherData);
      this.weatherFound.emit({ data: weatherData, unit: this.unit }); // include unit
    } catch {
      this.error = 'City not found or API error.';
      this.weatherFound.emit({ data: undefined, unit: this.unit });
    }
    this.loading = false;
  }


  onUnitChange() {
    if (this.city) {
      console.log(this.unit);
      this.search();
    }
  }
}