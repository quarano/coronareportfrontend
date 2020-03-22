import { ContactPersonsResolver } from './../resolvers/contact-persons.resolver';
import { ContactEntryComponent } from './contact-entry/contact-entry.component';
import { ContactComponent } from './contact.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  {
    path: '',
    component: ContactComponent,
    resolve: { contacts: ContactPersonsResolver }
  },
  {
    path: 'edit',
    component: ContactEntryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactRoutingModule { }
