import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { combineLatest, startWith, map, Observable } from 'rxjs';
import { FactsService } from '../../core/facts.service';
import { Fact } from '../../types/fact.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './favorites.component.html',
})
export class FavoritesComponent implements OnInit {
  searchControl = new FormControl('');
  isModalOpen = false;
  selectedText = '';
  filteredFavorites$!: Observable<Fact[]>;
  favorites$!: Observable<Fact[]>;

  viewMode: 'grid' | 'list' = 'list';
  selectMode = false;
  selected = new Set<string>();

  constructor(
    private facts: FactsService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.favorites$ = this.facts.favorites;
    this.filteredFavorites$ = combineLatest([
      this.favorites$,
      this.searchControl.valueChanges.pipe(startWith('')),
    ]).pipe(
      map(([list, q]) => {
        const lower = (q || '').toLowerCase();
        return lower ? list.filter((f) => f.text.toLowerCase().includes(lower)) : list;
      })
    );
  }

  toggleSelectMode() {
    this.selectMode = !this.selectMode;
    if (!this.selectMode) this.selected.clear();
  }

  onSelect(id: string) {
    if (this.selected.has(id)) this.selected.delete(id);
    else this.selected.add(id);
  }

  deleteSelected() {
    this.selected.forEach((id) => this.facts.removeFavorite(id));
    this.selected.clear();
    this.selectMode = false;
  }

  clearFavorites() {
    this.facts.clearFavorites();
    this.searchControl.setValue('');
    this.selected.clear();
  }

  openModal(text: string) {
    // disable modal on mobile or in select mode
    if (this.selectMode || window.innerWidth < 640) {
      return;
    }
    this.selectedText = text;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  removeFavorite(id: string) {
    this.facts.removeFavorite(id);
    this.selected.delete(id);
  }
}
