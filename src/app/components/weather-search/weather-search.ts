import { Component, Output, EventEmitter, ElementRef, ViewChild, HostListener } from '@angular/core';
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
  @ViewChild('searchInput', { static: false }) searchInput!: ElementRef;
  
  city = '';
  unit: 'metric' | 'imperial' = 'metric';
  loading = false;
  error = '';
  showRecentSearches = false;
  recentSearches: string[] = [];

  constructor(private weatherService: Weather) {
    this.loadRecentSearches();
  }

  @Output() weatherFound = new EventEmitter<{ data: IWeather | undefined, unit: 'metric' | 'imperial' }>();

private loadRecentSearches() {
  if (typeof window !== 'undefined' && window.localStorage) {
    const saved = localStorage.getItem('recentWeatherSearches');
    this.recentSearches = saved ? JSON.parse(saved) : [];
  }
}

private saveRecentSearches() {
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.setItem('recentWeatherSearches', JSON.stringify(this.recentSearches));
  }
}


  // Add city to recent searches
  private addToRecentSearches(city: string) {
    const normalizedCity = city.trim().toLowerCase();
    // Remove if already exists (to move to top)
    this.recentSearches = this.recentSearches.filter(c => c.toLowerCase() !== normalizedCity);
    // Add to beginning
    this.recentSearches.unshift(city.trim());
    // Keep only last 5 searches
    this.recentSearches = this.recentSearches.slice(0, 5);
    this.saveRecentSearches();
  }

  onInputFocus() {
    if (this.recentSearches.length > 0) {
      this.showRecentSearches = true;
    }
  }

  onInputBlur() {
    // Delay hiding to allow clicks on dropdown items
    setTimeout(() => {
      this.showRecentSearches = false;
    }, 150);
  }

  selectRecentSearch(city: string) {
    this.city = city;
    this.showRecentSearches = false;
    this.search();
  }

  clearRecentSearches() {
    this.recentSearches = [];
    this.saveRecentSearches();
    this.showRecentSearches = false;
  }

  // Close dropdown when clicking outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (!this.searchInput?.nativeElement.contains(event.target)) {
      this.showRecentSearches = false;
    }
  }

  async search() {
    if (!this.city) return;
    this.loading = true;
    this.error = '';
    this.showRecentSearches = false;
    
    try {
      const weatherData = await this.weatherService.getWeather(this.city, this.unit);
      console.log(weatherData);
      
      // Add successful search to recent searches
      if (weatherData) {
        this.addToRecentSearches(this.city);
      }
      
      this.weatherFound.emit({ data: weatherData, unit: this.unit });
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