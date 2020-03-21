import { DiaryEntryComponent } from './diary-entry/diary-entry.component';
import { DiaryRoutingModule } from './diary-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiaryComponent } from './diary.component';

@NgModule({
  imports: [
    CommonModule,
    DiaryRoutingModule
  ],
  declarations: [DiaryComponent, DiaryEntryComponent]
})
export class DiaryModule { }
