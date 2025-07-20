import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchBar } from './features/search-bar/search-bar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SearchBar],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class App {
  protected title = 'frontend-test';

  // constructor(private searchBar: SearchBar) {
  // }
}
