import { GroupedDiaryEntriesResolver } from '../resolvers/grouped-diary-entries.resolver';
import { SymptomsResolver } from './../resolvers/symptoms.resolver';
import { DiaryEntryResolver } from './../resolvers/diary-entry.resolver';
import { DiaryComponent } from './diary.component';
import { DiaryEntryComponent } from './diary-entry/diary-entry.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: DiaryComponent,
    resolve: { diaryEntries: GroupedDiaryEntriesResolver }
  },
  {
    path: 'edit/:id',
    component: DiaryEntryComponent,
    resolve: { diaryEntry: DiaryEntryResolver, symptoms: SymptomsResolver }
  },
  {
    path: 'new',
    component: DiaryEntryComponent,
    resolve: { diaryEntry: DiaryEntryResolver, symptoms: SymptomsResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiaryRoutingModule { }
