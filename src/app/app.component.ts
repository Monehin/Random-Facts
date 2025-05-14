import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: `
    <nav class="bg-indigo-600 text-white p-4 flex">
      <span class="font-bold">Random Facts</span>
      <div class="flex-1"></div>
      <a routerLink="/" class="px-2 hover:underline">Random</a>
      <a routerLink="/favorites" class="px-2 hover:underline">Favorites</a>
    </nav>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  title = 'Random Facts Dashboard';
}
