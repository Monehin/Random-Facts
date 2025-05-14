import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FACT_SOURCES, SourceDef } from '../tokens/fact‑sources.token';
import { Fact } from '../types/fact.model';

@Injectable({ providedIn: 'root' })
export class FactsService {
  private favorites$ = new BehaviorSubject<Fact[]>(this.load());
  public favorites = this.favorites$.asObservable();
  private activeKey = 'uselessfacts';

  constructor(@Inject(FACT_SOURCES) private sources: Record<string, SourceDef>) {}

  setSource(key: string) {
    if (this.sources[key]) this.activeKey = key;
  }

  /** For UI dropdown */
  getSourceList(): { key: string; name: string }[] {
    return Object.entries(this.sources).map(([k, s]) => ({ key: k, name: s.displayName }));
  }

  /** Now uses the active source’s fetchOne() */
  fetchRandom(): Observable<Fact> {
    return this.sources[this.activeKey].fetchOne();
  }

  getFavorites(): Fact[] {
    return this.favorites$.value;
  }

  addFavorite(f: Fact): void {
    if (!this.getFavorites().some((x) => x.id === f.id)) {
      const u = [...this.getFavorites(), f];
      this.save(u);
      this.favorites$.next(u);
    }
  }

  removeFavorite(id?: string): void {
    const u = this.getFavorites().filter((x) => x.id !== id);
    this.save(u);
    this.favorites$.next(u);
  }

  clearFavorites(): void {
    this.save([]);
    this.favorites$.next([]);
  }

  private load(): Fact[] {
    return JSON.parse(localStorage.getItem('favorites') || '[]');
  }
  private save(list: Fact[]): void {
    localStorage.setItem('favorites', JSON.stringify(list));
  }
}
