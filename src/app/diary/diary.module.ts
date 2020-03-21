import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DiaryEntryComponent } from './diary-entry/diary-entry.component';
import { DiaryRoutingModule } from './diary-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiaryComponent } from './diary.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

const MATERIAL_MODULES = [
  MatCardModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
];

@NgModule({
  imports: [
    CommonModule,
    DiaryRoutingModule,
    ...MATERIAL_MODULES,
    ReactiveFormsModule
  ],
  declarations: [DiaryComponent, DiaryEntryComponent]
})
export class DiaryModule { }
