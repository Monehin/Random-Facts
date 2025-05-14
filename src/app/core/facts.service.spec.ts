import { TestBed } from '@angular/core/testing';
import { mockSources } from '../../test-utils/mocks/fact-sources';
import { FACT_SOURCES } from '../tokens/fact‑sources.token';
import { Fact } from '../types/fact.model';
import { FactsService } from './facts.service';

describe('FactsService with FACT_SOURCES', () => {
  let service: FactsService;

  beforeEach(() => {
    localStorage.clear();

    TestBed.configureTestingModule({
      providers: [
        FactsService,
        {
          provide: FACT_SOURCES,
          useValue: mockSources,
        },
      ],
    });

    service = TestBed.inject(FactsService);
  });

  afterEach(() => {
    service.clearFavorites();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getSourceList returns both keys with display names', () => {
    const list = service.getSourceList();
    expect(list).toEqual([
      { key: 'uselessfacts', name: 'Useless Facts' },
      { key: 'history', name: 'History Facts' },
    ]);
  });

  it('fetchRandom uses default source (uselessfacts)', (done) => {
    service.fetchRandom().subscribe((f) => {
      expect(f.source).toBe('uselessfacts');
      expect(f.text).toBe('Stub useless fact');
      done();
    });
  });

  it('setSource switches to history provider', (done) => {
    service.setSource('history');
    service.fetchRandom().subscribe((f) => {
      expect(f.source).toBe('history');
      expect(f.text).toBe('Stub history fact');
      done();
    });
  });

  it('addFavorite, getFavorites, removeFavorite, clearFavorites work', () => {
    const fact: Fact = { id: 'fav1', text: 'A fav', source: 'history' };
    expect(service.getFavorites()).toEqual([]);

    service.addFavorite(fact);
    expect(service.getFavorites()).toEqual([fact]);
    expect(JSON.parse(localStorage.getItem('favorites')!)).toEqual([fact]);

    service.removeFavorite('fav1');
    expect(service.getFavorites()).toEqual([]);

    service.addFavorite(fact);
    service.clearFavorites();
    expect(service.getFavorites()).toEqual([]);
    expect(localStorage.getItem('favorites')).toEqual('[]');
  });

  it('does not add duplicate favorites', () => {
    const fact: Fact = { id: 'dup', text: 'D', source: 'history' };
    service.addFavorite(fact);
    service.addFavorite(fact);
    expect(service.getFavorites().length).toBe(1);
  });
});
