import { Component } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { DataService } from './core/data.service';
import { startWith, switchMap, tap } from 'rxjs/operators';

export function PetNameValidator(c: FormControl): ValidationErrors {
  return !c.value || /(Max)|(Rex)/.test(c.value) ? null : { petName : true }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  form = new FormGroup({});
  model = {
    id: 123123,
    firstName: 'John',
    age: 44,
    countryId: 2,
    cityId: 1,
    ip: null
  };
  fields: FormlyFieldConfig[] = [
    {
      key: 'id'
    },
    {
      key: 'firstName',
      type: 'input',
      templateOptions: {
        label: 'First Name',
        required: true
      }
    },
    {
      key: 'age',
      type: 'input',
      templateOptions: {
        type: 'number',
        label: 'Age',
        min: 18
      },
      validation: {
        messages: {
          min: 'You have to be 18 or older.'
        }
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
        'templateOptions.disabled': (model) => !model.countryId,
        'model.cityId': '!model.nationId ? null : model.cityId'
      },
      hideExpression: model => !model.countryId,
      hooks: {
        onInit: (field: FormlyFieldConfig) => {
          field.templateOptions.options = field.form.get('countryId').valueChanges.pipe(
            startWith(this.model.countryId),
            tap(),
            switchMap(countryId => this.dataService.getCities(countryId))
          )
        }
      }
    },
    {
      key: 'petName',
      type: 'input',
      templateOptions: {
        label: 'Pet Name',
        required: true
      },
      validators: {
        petName: {
          expression: c => !c.value || /(Max)|(Rex)/.test(c.value),
          message: 'Pet name must be Max or Rex.'
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
