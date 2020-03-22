import { ApiService } from './services/api.service';
import { SymptomDto } from './models/symptom';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'coronareportfrontend';
  symptoms: SymptomDto[] = [];
  private apiSubscription: Subscription;

  constructor(private apiService: ApiService) {

  }

  ngOnDestroy(): void {
    this.apiSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.apiService.getSymptoms()
      .subscribe(symtpoms => this.symptoms = symtpoms);
  }
}
