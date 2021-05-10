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

  getCities(nationId: number) {
    return of([
      {
        value: null,
        label: ' -- ',
        nationId: null
      },
      {
        value: 10,
        label: 'Bolzano',
        nationId: 1
      },
      {
        value: 11,
        label: 'Rome',
        nationId: 1
      },
      {
        value: 20,
        label: 'Berlin',
        nationId: 2
      },
      {
        value: 20,
        label: 'Munich',
        nationId: 2
      },
      {
        value: 30,
        label: 'San Francisco',
        nationId: 3
      }
    ].filter(entry => !entry.nationId || entry.nationId === nationId));
  }
}
