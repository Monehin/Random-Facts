import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { mockSources } from '../../../test-utils/mocks/fact-sources';
import { FactsService } from '../../core/facts.service';
import { FACT_SOURCES } from '../../tokens/fact‑sources.token';
import { FactViewerComponent } from './fact-viewer.component';

describe('FactViewerComponent', () => {
  let fixture: ComponentFixture<FactViewerComponent>;
  let comp: FactViewerComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FactViewerComponent],
      providers: [
        FactsService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([]),
        { provide: FACT_SOURCES, useValue: mockSources },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FactViewerComponent);
    comp = fixture.componentInstance;
  });

  it('should create', () => {
    expect(comp).toBeTruthy();
  });
});
