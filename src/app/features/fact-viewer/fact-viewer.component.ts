import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { FactsService } from '../../core/facts.service';
import { Fact } from '../../types/fact.model';
import { RecentlyAddedComponent } from '../recently-added/recently-added.component';
import SearchComponent from '../search/search.component';

@Component({
  selector: 'app-fact-viewer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SearchComponent, RecentlyAddedComponent, RouterModule],
  templateUrl: './fact-viewer.component.html',
  animations: [
    trigger('fadeEnter', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class FactViewerComponent implements OnInit {
  fact?: Fact;
  loading = false;
  error?: string;
  isFavorite = false;

  recentFavorites: Fact[] = [];
  totalFavorites = 0;

  // for source dropdown
  sourceOptions: { key: string; name: string }[] = [];
  currentSource = '';

  constructor(private svc: FactsService) {}

  ngOnInit(): void {
    // favorites panel
    this.svc.favorites.subscribe((list) => {
      this.totalFavorites = list.length;
      this.recentFavorites = [...list].slice(-3).reverse();
    });

    // source dropdown setup
    this.sourceOptions = this.svc.getSourceList();
    this.currentSource = this.sourceOptions[0].key;
    this.svc.setSource(this.currentSource);

    this.loadFact();
  }

  onSourceChange(key: string) {
    this.currentSource = key;
    this.svc.setSource(key);
    this.loadFact();
  }

  loadFact(): void {
    this.loading = true;
    this.error = undefined;
    this.fact = undefined;
    this.isFavorite = false;

    this.svc.fetchRandom().subscribe({
      next: (f) => {
        this.fact = f;
        this.loading = false;
        this.isFavorite = this.svc.getFavorites().some((x) => x.id === f.id);
      },
      error: (e) => {
        this.error = e.message;
        this.loading = false;
      },
    });
  }

  saveFavorite(): void {
    if (!this.fact || this.isFavorite) return;
    this.svc.addFavorite(this.fact);
    this.isFavorite = true;
    this.loadFact();
  }

  onSearchSelect(input: string | Fact) {
    if (typeof input === 'string') {
      const fact = this.recentFavorites.find((f) => f.text === input);
      if (fact) {
        this.fact = fact;
        this.isFavorite = true;
      }
    } else {
      this.fact = input;
      this.isFavorite = true;
    }
  }

  removeFavorite(id: string) {
    this.svc.removeFavorite(id);
  }
}
