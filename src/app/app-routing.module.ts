import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { IsAuthenticatedGuard } from './guards/is-authenticated.guard';
import { IsNotAuthenticatedGuard } from './guards/is-not-authenticated.guard';
// ToDo: Revert
const routes: Routes = [
  {
    path: 'welcome', loadChildren: () =>
      import('./welcome/welcome.module').then(m => m.WelcomeModule)
  },
  {
    path: 'diary', loadChildren: () =>
      import('./diary/diary.module').then(m => m.DiaryModule)
  },
  {
    path: 'contacts', loadChildren: () =>
      import('./contact/contact.module').then(m => m.ContactModule)
  },
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
