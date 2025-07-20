import { Component, computed, effect, signal } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  imports: [],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})

export class SearchBar {

  private offset = signal(0);
  private query = signal('');
  private _searchResultsArray = signal([]);
  public searchResultsArray = computed(() => this._searchResultsArray);
  
  constructor () {
    effect(() => this.updateResults(this.query(), this.offset()));
  }

  setQuery(event: Event) {
    this.query.set((event.target as HTMLInputElement).value);    
  }

  setOffset(offset: number) {
    this.offset.set(offset);
  }

  /**
   * Broadcasts the new search results through updating the signal
   * @param query 
   * @param offset 
   */
  updateResults(query: string, offset: number) {
    const result: Promise<Response> = fetch(`https://api.getwemap.com/v3.0/pinpoints/search?format=json&limit=10&offset=${offset}&query=${query}`);
    
    result.then((response) => {
      response.json().then((json) => {

        this._searchResultsArray.set(json.results)
        console.log(json.results);
      });
    });
  }
}
