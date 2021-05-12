import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { NgSelectFormlyComponent } from './ng-select.type';
import { dataCyExtension } from './data-cy.extension';

export const minValidationMessage = (err, field: FormlyFieldConfig) => {
  return `Please provide a value bigger than ${err.min}. You provided ${err.actual}.`;
}

@NgModule({
  declarations: [
    AppComponent, NgSelectFormlyComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    NgSelectModule,
    FormsModule,
    FormlyModule.forRoot({
      extras: { lazyRender: true } ,
      validationMessages: [{
        name: 'required',
        message: 'This field is required.'
      }, {
        name: 'min',
        message: minValidationMessage
      }],
      types: [{
        name: 'my-autocomplete',
        component: NgSelectFormlyComponent
      }],
      extensions: [{
        name: 'data-cy-extension',
        extension: dataCyExtension
      }]
    }),
    FormlyMaterialModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
