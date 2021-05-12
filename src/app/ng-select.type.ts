import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'formly-ng-select',
    template: `
        <div class="mat-input-infix mat-form-field-infix">
            <ng-select
                [items]="to.options | async"
                [placeholder]="to.label"
                [bindValue]="to.bindValue || 'value'"
                [formControl]="formControl"
                [class.is-invalid]="showError"
            >
            </ng-select>
        </div>
    `
})
export class NgSelectFormlyComponent extends FieldType {}
