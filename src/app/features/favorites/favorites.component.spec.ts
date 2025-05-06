import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FavoritesComponent } from './favorites.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FactsService } from '../../core/facts.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

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
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritesComponent);
    comp = fixture.componentInstance;
  });

  it('should create', () => {
    expect(comp).toBeTruthy();
  });
});