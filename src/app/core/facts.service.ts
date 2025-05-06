import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map, catchError, delay } from 'rxjs/operators';
import { Fact } from '../shared/fact.model';

interface SourceDef {
  displayName: string;
  fetchOne: () => Observable<Fact>;
}

@Injectable({ providedIn: 'root' })
export class FactsService {
  // favorites logic untouched
  private favorites$ = new BehaviorSubject<Fact[]>(this.load());
  public favorites = this.favorites$.asObservable();

  // ── NEW: registry of sources ────────────────────────────────────────
  private sources: Record<string,SourceDef> = {
    uselessfacts: {
      displayName: 'Useless Facts',
      fetchOne: () =>
        this.http
          .get<Pick<Fact,'id'|'text'>>('https://uselessfacts.jsph.pl/random.json?language=en')
          .pipe(
            map(p => ({ id:p.id, text:p.text, source:'uselessfacts' })),
            catchError(() => throwError(() => new Error('Useless API error')))
          )
    },
    history: {
      displayName: 'History Facts',
      fetchOne: () => {
        const samples: Fact[] = [
          { id:'h1', text:'Apollo 11 landed on the Moon in 1969.', source:'history' },
          { id:'h2', text:'The Great Fire of London was in 1666.', source:'history' }
        ];
        const pick = samples[Math.floor(Math.random()*samples.length)];
        return of(pick).pipe(delay(300));
      }
    }
  };
  private activeKey = 'uselessfacts';
  // ─────────────────────────────────────────────────────────────────────

  constructor(private http: HttpClient) {}

  /** Switch which source fetchRandom() will use */
  setSource(key: string) {
    if (this.sources[key]) this.activeKey = key;
  }

  /** For UI dropdown */
  getSourceList(): { key:string; name:string }[] {
    return Object.entries(this.sources).map(([k,s])=>({key:k,name:s.displayName}));
  }

  /** Now uses the active source’s fetchOne() */
  fetchRandom(): Observable<Fact> {
    return this.sources[this.activeKey].fetchOne();
  }

  getFavorites(): Fact[] {
    return this.favorites$.value;
  }

  addFavorite(f: Fact): void {
    if (!this.getFavorites().some(x=>x.id===f.id)) {
      const u=[...this.getFavorites(),f];
      this.save(u);
      this.favorites$.next(u);
    }
  }

  removeFavorite(id?: string): void {
    const u=this.getFavorites().filter(x=>x.id!==id);
    this.save(u);
    this.favorites$.next(u);
  }

  clearFavorites(): void {
    this.save([]);
    this.favorites$.next([]);
  }

  private load(): Fact[] {
    return JSON.parse(localStorage.getItem('favorites')||'[]');
  }
  private save(list:Fact[]): void {
    localStorage.setItem('favorites', JSON.stringify(list));
  }
}