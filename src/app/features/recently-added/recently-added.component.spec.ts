import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RecentlyAddedComponent } from './recently-added.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { FactsService } from '../../core/facts.service';
import { provideRouter } from '@angular/router';
import { FACT_SOURCES } from '../../tokens/fact‑sources.token';
import { mockSources } from '../../../test-utils/mocks/fact-sources';

describe('RecentlyAddedComponent', () => {
  let fixture: ComponentFixture<RecentlyAddedComponent>;
  let comp: RecentlyAddedComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentlyAddedComponent],
      providers: [
        FactsService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([]),
        { provide: FACT_SOURCES, useValue: mockSources },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RecentlyAddedComponent);
    comp = fixture.componentInstance;
  });

  it('should create', () => {
    expect(comp).toBeTruthy();
  });
});
