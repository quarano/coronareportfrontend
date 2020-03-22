import { ContactPersonsResolver } from './../resolvers/contact-persons.resolver';
import { ContactEntryComponent } from './contact-entry/contact-entry.component';
import { ContactComponent } from './contact.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactPersonResolver } from '../resolvers/contact-person.resolver';



const routes: Routes = [
  {
    path: '',
    component: ContactComponent,
    resolve: { contacts: ContactPersonsResolver }
  },
  {
    path: 'edit/:id',
    component: ContactEntryComponent,
    resolve: { contactPerson: ContactPersonResolver }
  },
  {
    path: 'new',
    component: ContactEntryComponent,
    resolve: { contactPerson: ContactPersonResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactRoutingModule { }
