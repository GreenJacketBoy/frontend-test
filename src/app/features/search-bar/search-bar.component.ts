import { Component, effect, signal } from '@angular/core';
import { Results } from '../results/results.component';

@Component({
  selector: 'app-search-bar',
  imports: [Results],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})

export class SearchBar {

  protected offset = signal(0);
  private query = signal('');
  private timeout: NodeJS.Timeout | undefined = undefined;

  public searchResultsArray = signal<Array<any>>([]);
  
  constructor () {
    // update the page when the query or offset is changed 
    effect(() => {
      // looks like angular doesn't see the signals nested in the timeout function as dependencies so, yeah
      this.query();
      this.offset();
      
      // keeps at least 1s between page update
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.updateResults(this.query(), this.offset());
      }
      , 1000);
    });
  }

  setQuery(event: Event) {
    this.query.set((event.target as HTMLInputElement).value)
    // personal choice here, feel like it's better to reset the page index when the query updates
    this.offset.set(0);
  }

  changePage(mode: 'previous' | 'next') {
    if (mode === 'previous' && this.offset() >= 10)
      this.offset.set(this.offset() - 10);
    else if (mode === 'next')
      this.offset.set(this.offset() + 10);
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

        this.searchResultsArray.set(json.results);
      });
    });
  }
}
