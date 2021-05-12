import { Component } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { FormlyField, FormlyFieldConfig, FormlyTemplateOptions } from '@ngx-formly/core';
import { DataService } from './core/data.service';
import { startWith, switchMap, tap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

export function PetNameValidator(c: FormControl): ValidationErrors {
  return !c.value || /(Max)|(Rex)/.test(c.value) ? null : { petName: true };
}

const formlyRow = (fieldConfig: FormlyFieldConfig[]) => {
  return {
    fieldGroupClassName: 'display-flex',
    fieldGroup: fieldConfig
  };
};

const formlyInput = (config: {
  key: string,
  label: string,
  templateOptions: FormlyTemplateOptions
}): FormlyFieldConfig => {
  return {
    key: config.key,
    type: 'input',
    className: 'flex-3',
    templateOptions: {
      label: config.label,
      ...config.templateOptions
    }
  };
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private dataService: DataService,
    private translate: TranslateService
  ) {
    this.translate.use('en');
  }

  form = new FormGroup({});
  model = {
    id: 123123,
    firstName: 'John',
    age: 44,
    countryId: 2,
    cityId: 1,
    petName: null
  };
  fields: FormlyFieldConfig[] = [
    {
      key: 'id'
    },
    formlyRow([
      formlyInput({
        key: 'firstName',
        label: 'First Name',
        templateOptions: {
          required: true
        }
      }),
      {
        key: 'age',
        type: 'input',
        className: 'flex-1',
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
      }
    ]),
    formlyRow([
      {
        key: 'countryId',
        type: 'my-autocomplete',
        className: 'flex-3',
        templateOptions: {
          label: 'Country',
          options: this.dataService.getCountries()
        }
      },
      {
        key: 'cityId',
        type: 'select',
        className: 'flex-3',
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
            );
          }
        }
      },
    ]),
    formlyRow([{
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
    }])
  ];

  title = 'formly';

  onSubmit({ valid, value }) {
    console.log(value);
  }
}
