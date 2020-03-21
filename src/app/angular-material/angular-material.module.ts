import { NgModule } from '@angular/core';
import { MatTreeModule } from '@angular/material/tree';
import {
  MatMomentDateModule,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from 'ngx-mat-datetime-picker';
import { NgxMatMomentModule } from 'ngx-mat-moment-adapter';

const materialModules = [
  MatButtonModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatCardModule,
  MatRadioModule,
  MatTreeModule,
  MatMomentDateModule,
  MatSlideToggleModule,
  NgxMatDatetimePickerModule,
  NgxMatTimepickerModule,
  NgxMatMomentModule,
  MatSnackBarModule,
  MatToolbarModule
];

@NgModule({
  imports: [...materialModules],
  exports: [...materialModules],
  declarations: [],
  providers: [
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    { provide: MAT_DATE_LOCALE, useValue: 'de' },
  ]
})
export class AngularMaterialModule { }
