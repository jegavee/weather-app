import { Component, inject, OnInit, resource} from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherSearch } from '../../components/weather-search/weather-search';
import { WeatherCard } from '../../components/weather-card/weather-card';
import { IWeather } from '../../models/weather.model';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    WeatherSearch,
    WeatherCard
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  weatherData: IWeather | undefined = undefined;

  onWeatherFound(result: IWeather | undefined) {
    this.weatherData = result;
  }

}
