import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  typesOfShoes: string[] = ['CoronaFreund1', 'CoronaFreund2', 'CoronaFreund3', 'CoronaFreund4', 'CoronaFreund5'];

  constructor() { }

  ngOnInit() {
  }

}
