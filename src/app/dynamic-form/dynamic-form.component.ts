import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { DataService } from '../core/data.service';
import { FormlyJsonschema } from '@ngx-formly/core/json-schema';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {

  constructor(
    private dataService: DataService,
    private http: HttpClient,
    private formlyJsonSchema: FormlyJsonschema
  ) { }

  form = new FormGroup({});
  model = {
    id: 123123,
    firstName: 'John',
    age: 44,
    countryId: 2,
    cityId: 1,
    petName: null
  };
  fields: FormlyFieldConfig[];

  ngOnInit(): void {
    this.http
    //  .get<FormlyFieldConfig[]>('/assets/dynamic-form.json')
    //   .subscribe(fields => {
    //     this.fields = fields;
    //   });
      .get('/assets/dynamic-form-schema.json')
      .subscribe(jsonSchema => {
        const formlyConfig = this.formlyJsonSchema.toFieldConfig(jsonSchema);
        console.log(jsonSchema);
        console.log(formlyConfig);
        this.fields = formlyConfig.fieldGroup;
      });
  }

  onSubmit({ valid, value }) {
    console.log(value);
  }
}
