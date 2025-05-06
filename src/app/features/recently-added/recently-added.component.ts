import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Fact } from '../../shared/fact.model';
import { FactsService } from '../../core/facts.service';

@Component({
  selector: 'app-recently-added',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './recently-added.component.html',
})
export class RecentlyAddedComponent {
  @Input() favorites: Fact[] = [];
  @Output() delete = new EventEmitter<string>();
  @Output() factSelected = new EventEmitter<Fact>();
  allFavorites: Fact[] = [];

  constructor(
    private facts: FactsService,
    public router: Router
  ) {
    this.facts.favorites.subscribe(favs => {
      this.allFavorites = favs;
    });
  }
}