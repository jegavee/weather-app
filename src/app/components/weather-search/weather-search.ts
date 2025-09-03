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
  loading = false;
  error = '';

  @Output() weatherFound = new EventEmitter<IWeather>();

  constructor(private weatherService: Weather) {}

  async search() {
    if (!this.city) return;
    this.loading = true;
    this.error = '';
    try {
      const weatherData = await this.weatherService.getWeather(this.city);
      this.weatherFound.emit(weatherData);
    } catch {
      this.error = 'City not found or API error.';
      this.weatherFound.emit(undefined);
    }
    this.loading = false;
  }
}