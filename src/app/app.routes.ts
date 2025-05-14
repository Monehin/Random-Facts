import { Routes } from '@angular/router';
import { FactViewerComponent } from './features/fact-viewer/fact-viewer.component';
import { FavoritesComponent } from './features/favorites/favorites.component';

export const routes: Routes = [
  { path: '', component: FactViewerComponent },
  { path: 'favorites', component: FavoritesComponent },
];
