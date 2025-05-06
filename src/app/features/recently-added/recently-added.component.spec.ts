import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RecentlyAddedComponent } from './recently-added.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { FactsService } from '../../core/facts.service';
import { provideRouter } from '@angular/router';

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
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RecentlyAddedComponent);
    comp = fixture.componentInstance;
  });

  it('should create', () => {
    expect(comp).toBeTruthy();
  });
});