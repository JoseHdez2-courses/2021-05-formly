import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { DataService } from './core/data.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  form = new FormGroup({});
  model = {
    firstName: 'John',
    age: 44,
    nationId: 2,
    cityId: 1
  };
  fields: FormlyFieldConfig[] = [
    {
      key: 'firstName',
      type: 'input',
      templateOptions: {
        label: 'First Name'
      }
    },
    {
      key: 'age',
      type: 'input',
      templateOptions: {
        type: 'number',
        label: 'Age',
        countryId: 2
      }
    },
    {
      key: 'countryId',
      type: 'select',
      templateOptions: {
        label: 'Country',
        options: this.dataService.getCountries()
      }
    },
    {
      key: 'cityId',
      type: 'select',
      templateOptions: {
        label: 'City',
        options: []
      },
      expressionProperties: {
        'templateOptions.disabled': (model) => !model.nationId
      },
      hooks: {
        onInit: (field: FormlyFieldConfig) => {
          field.templateOptions.options = field.form.get('countryId').valueChanges.pipe(
            switchMap(countryId => this.dataService.getCities(countryId))
          )
        }
      }
    }
  ];

  constructor(private dataService: DataService){}

  onSubmit({ valid, value }) {
    console.log(value);
  }

  title = 'formly';
}
