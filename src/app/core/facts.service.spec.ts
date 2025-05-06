import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FactsService } from './facts.service';
import { Fact } from '../shared/fact.model';

describe('FactsService', () => {
  let service: FactsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [
        FactsService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(FactsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    service.clearFavorites();
    localStorage.clear();
  });

  it('should fetch a random fact via fetchRandom() from default source', () => {
    const dummy: Fact = { id: '1', text: 'Test fact', source: 'uselessfacts' };

    service.fetchRandom().subscribe(fact => {
      expect(fact).toEqual(dummy);
    });

    const req = httpMock.expectOne(
      'https://uselessfacts.jsph.pl/random.json?language=en'
    );
    expect(req.request.method).toBe('GET');
    req.flush({ id: '1', text: 'Test fact' });
  });

  it('should return list of source keys and names', () => {
    const list = service.getSourceList();
    expect(list.some(s => s.key === 'uselessfacts' && s.name === 'Useless Facts')).toBeTrue();
    expect(list.some(s => s.key === 'history' && s.name === 'History Facts')).toBeTrue();
  });

  it('should fetch from history source after setSource', fakeAsync(() => {
    service.setSource('history');
    let received: Fact | undefined;
    service.fetchRandom().subscribe(f => (received = f));
    // history fetchOne uses delay(300)
    tick(300);
    expect(received).toBeDefined();
    expect(received!.source).toBe('history');
    expect(received!.text).toMatch(/Apollo 11 landed on the Moon in 1969\.|The Great Fire of London was in 1666\./);
  }));

  it('should ignore invalid source keys', fakeAsync(() => {
    service.setSource('doesnotexist');
    // still default to uselessfacts
    service.fetchRandom().subscribe();
    const req = httpMock.expectOne(
      'https://uselessfacts.jsph.pl/random.json?language=en'
    );
    req.flush({ id: 'x', text: 'X' });
  }));

  it('should add, retrieve and remove favorites', () => {
    const fact: Fact = { id: 'fav1', text: 'Fav fact', source: 'uselessfacts' };
    expect(service.getFavorites()).toEqual([]);

    service.addFavorite(fact);
    expect(service.getFavorites()).toEqual([fact]);
    expect(JSON.parse(localStorage.getItem('favorites')!)).toEqual([fact]);

    service.removeFavorite('fav1');
    expect(service.getFavorites()).toEqual([]);
    expect(JSON.parse(localStorage.getItem('favorites')!)).toEqual([]);
  });

  it('should not add duplicate favorites', () => {
    const fact: Fact = { id: 'dup', text: 'Dup fact', source: 'uselessfacts' };
    service.addFavorite(fact);
    service.addFavorite(fact);
    expect(service.getFavorites().length).toBe(1);
  });

  it('should clear all favorites', () => {
    service.addFavorite({ id: 'a', text: 'A', source: 'uselessfacts' });
    service.addFavorite({ id: 'b', text: 'B', source: 'uselessfacts' });
    expect(service.getFavorites().length).toBe(2);

    service.clearFavorites();
    expect(service.getFavorites()).toEqual([]);
    expect(localStorage.getItem('favorites')).toEqual('[]');
  });
});
