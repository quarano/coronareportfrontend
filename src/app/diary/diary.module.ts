import { RouterModule } from '@angular/router';
import { GroupedDiaryEntriesResolver } from '../resolvers/grouped-diary-entries.resolver';
import { AngularMaterialModule } from './../angular-material/angular-material.module';
import { SymptomsResolver } from './../resolvers/symptoms.resolver';
import { DiaryEntryResolver } from './../resolvers/diary-entry.resolver';
import { DiaryEntryComponent } from './diary-entry/diary-entry.component';
import { DiaryRoutingModule } from './diary-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiaryComponent } from './diary.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    DiaryRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [DiaryComponent, DiaryEntryComponent],
  providers: [DiaryEntryResolver, SymptomsResolver, GroupedDiaryEntriesResolver]
})
export class DiaryModule { }
