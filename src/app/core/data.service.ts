import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getCountries() {
    return of([
      {
        value: null,
        label: ' -- '
      },
      {
        value: 1,
        label: 'Italy'
      },
      {
        value: 2,
        label: 'Germany'
      },
      {
        value: 3,
        label: 'U.S.'
      }
    ])
  }

  getCities(countryId: number) {
    return of([
      {
        value: null,
        label: ' -- ',
        countryId: null
      },
      {
        value: 10,
        label: 'Bolzano',
        countryId: 1
      },
      {
        value: 11,
        label: 'Rome',
        countryId: 1
      },
      {
        value: 20,
        label: 'Berlin',
        countryId: 2
      },
      {
        value: 20,
        label: 'Munich',
        countryId: 2
      },
      {
        value: 30,
        label: 'San Francisco',
        countryId: 3
      }
    ].filter(entry => !entry.countryId || entry.countryId === countryId));
  }
}
