import { Component, Output, EventEmitter, ElementRef, ViewChild, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-weather-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './weather-search.html',
  styleUrl: './weather-search.css'
})
export class WeatherSearch {
  @ViewChild('searchInput', { static: false }) searchInput!: ElementRef;

  // signals for state
  city = signal('');
  unit = signal<'metric' | 'imperial'>('metric');
  showRecentSearches = signal(false);
  recentSearches = signal<string[]>([]);

  @Output() searchCity = new EventEmitter<{ city: string; unit: 'metric' | 'imperial' }>();

  constructor() {
    this.loadRecentSearches();
  }

  // localStorage helpers
  private loadRecentSearches() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = localStorage.getItem('recentWeatherSearches');
      this.recentSearches.set(saved ? JSON.parse(saved) : []);
    }
  }

  private saveRecentSearches() {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('recentWeatherSearches', JSON.stringify(this.recentSearches()));
    }
  }

  private addToRecentSearches(city: string) {
    const normalizedCity = city.trim().toLowerCase();
    const updated = this.recentSearches().filter(c => c.toLowerCase() !== normalizedCity);
    updated.unshift(city.trim());
    this.recentSearches.set(updated.slice(0, 5));
    this.saveRecentSearches();
  }

  // search trigger
search() {
  const city = this.city().trim();

  console.log('Searching for city:', city);
  if (!city) return;

  this.addToRecentSearches(city);
  this.searchCity.emit({ city, unit: this.unit() });
  this.showRecentSearches.set(false);
}


  onUnitChange() {
    if (this.city()) {
      this.search();
    }
  }

  // dropdown behavior
  onInputFocus() {
    if (this.recentSearches().length > 0) {
      this.showRecentSearches.set(true);
    }
  }

  onInputBlur() {
    setTimeout(() => this.showRecentSearches.set(false), 150);
  }

  selectRecentSearch(city: string) {
    this.city.set(city);
    this.showRecentSearches.set(false);
    this.search();
  }

  clearRecentSearches() {
    this.recentSearches.set([]);
    this.saveRecentSearches();
    this.showRecentSearches.set(false);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (!this.searchInput?.nativeElement.contains(event.target)) {
      this.showRecentSearches.set(false);
    }
  }
}
