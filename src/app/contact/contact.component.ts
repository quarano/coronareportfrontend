import { SubSink } from 'subsink';
import { Component, OnInit } from '@angular/core';
import { ContactPersonDto } from '../models/contact-person';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contacts: ContactPersonDto[] = [];
  private subs = new SubSink();

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.subs.add(this.route.data.subscribe(data => {
      this.contacts = data.contacts;
    }));
  }
}
