import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { startWith, map, Observable } from 'rxjs';
import { Fact } from '../../shared/fact.model';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search.component.html',
})
export default class SearchComponent {
  @Input() favorites: Fact[] = [];
  @Output() searchSubmitted = new EventEmitter<string>();

  control = new FormControl('');
  suggestions$: Observable<Fact[]> = this.control.valueChanges.pipe(
    startWith(''),
    map(q => {
      const lower = (q || '').toLowerCase();
      return this.favorites.filter(f =>
        f.text.toLowerCase().includes(lower)
      );
    })
  );

  onSelect(f: Fact) {
    this.searchSubmitted.emit(f.text);
    this.control.setValue('');
  }
}