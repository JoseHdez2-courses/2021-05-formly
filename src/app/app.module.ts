import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyFieldConfig, FormlyModule, FORMLY_CONFIG } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { NgSelectFormlyComponent } from './ng-select.type';
import { dataCyExtension } from './data-cy.extension';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { registerTranslateExtension } from './translate.extension';

export const minValidationMessage = (err, field: FormlyFieldConfig) => {
  return `Please provide a value bigger than ${err.min}. You provided ${err.actual}.`;
};

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent, NgSelectFormlyComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    NgSelectModule,
    HttpClientModule,
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
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    FormlyMaterialModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [{
    provide: FORMLY_CONFIG,
    multi: true,
    useFactory: registerTranslateExtension,
    deps: [TranslateService]
  }],
  bootstrap: [AppComponent]
})

export class AppModule { }
