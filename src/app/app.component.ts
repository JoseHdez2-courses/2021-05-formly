import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { DataService } from './core/data.service';

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
    nationId: 2
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
        nationId: 2
      }
    },
    {
      key: 'nationId',
      type: 'select',
      templateOptions: {
        label: 'Nation',
        options: this.dataService.getNations()
      }
    }
  ];

  constructor(private dataService: DataService){}

  onSubmit({ valid, value }) {
    console.log(value);
  }

  title = 'formly';
}
