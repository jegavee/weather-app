import { Component, inject, OnInit, resource} from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherSearch } from '../../components/weather-search/weather-search';
import { WeatherCard } from '../../components/weather-card/weather-card';
import { IWeather } from '../../models/weather.model';
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

  weatherData: IWeather | undefined = undefined;
  unit: 'metric' | 'imperial' = 'metric';

onWeatherFound(result: { data: IWeather | undefined, unit: 'metric' | 'imperial' }) {
  this.weatherData = result.data;
  this.unit = result.unit;
}


}
