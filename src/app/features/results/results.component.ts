import { Component, input } from '@angular/core';

@Component({
  selector: 'app-results',
  imports: [],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css',
})


export class Results {

  resultsArray = input<Array<any>>();
}
