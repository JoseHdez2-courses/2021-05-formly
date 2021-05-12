import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { DataService } from '../core/data.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {

  constructor(
    private dataService: DataService,
    private http: HttpClient
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
      .get<FormlyFieldConfig[]>('/assets/dynamic-form.json')
      .subscribe(fields => {
        this.fields = fields;
      });
  }

  onSubmit({ valid, value }) {
    console.log(value);
  }
}
