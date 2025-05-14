import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { mockSources } from '../../../test-utils/mocks/fact-sources';
import { FactsService } from '../../core/facts.service';
import { FACT_SOURCES } from '../../tokens/fact‑sources.token';
import { FavoritesComponent } from './favorites.component';

describe('FavoritesComponent', () => {
  let fixture: ComponentFixture<FavoritesComponent>;
  let comp: FavoritesComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoritesComponent, ReactiveFormsModule],
      providers: [
        FactsService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([]),
        { provide: FACT_SOURCES, useValue: mockSources },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritesComponent);
    comp = fixture.componentInstance;
  });

  it('should create', () => {
    expect(comp).toBeTruthy();
  });
});
