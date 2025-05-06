import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FactViewerComponent } from './fact-viewer.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { FactsService } from '../../core/facts.service';
import { provideRouter } from '@angular/router';

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
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FactViewerComponent);
    comp = fixture.componentInstance;
  });

  it('should create', () => {
    expect(comp).toBeTruthy();
  });
});