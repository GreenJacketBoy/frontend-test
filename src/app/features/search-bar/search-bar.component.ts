import { AfterViewInit, Component, effect, signal } from '@angular/core';
import { Results } from '../results/results.component';

@Component({
  selector: 'app-search-bar',
  imports: [Results],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})

export class SearchBar implements AfterViewInit {

  protected offset = signal(0);
  private query = signal('');
  private timeout: NodeJS.Timeout | undefined = undefined;

  public searchResultsArray = signal<Array<any>>([]);
  
  constructor () {
    // update the page when the query or offset is changed 
    effect(() => {
      this.updateResults(this.query(), this.offset());
    });
  }
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
    // query.set(recup(cookiebyid(search)))
  }

  

  setQuery(event: Event) {      
    // keeps at least 750ms between page update from text input (instant when it's from page change)
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {

      this.query.set((event.target as HTMLInputElement).value)
      // personal choice here, feel like it's better to reset the page index when the query updates
      this.offset.set(0);
    }, 750);
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
  async updateResults(query: string, offset: number) {
    const result: Promise<Response> = fetch(`https://api.getwemap.com/v3.0/pinpoints/search?format=json&limit=10&offset=${offset}&query=${query}`);
    
    console.log(1);
    // set cookie(id='search', contenu=query)

    result.then((response) => {
      response.json().then((json) => {
        console.log(2);
        this.searchResultsArray.set(json.results);
      });
    });
    console.log(3);
    
  }
}
