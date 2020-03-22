import { ApiService } from './services/api.service';
import { Symptom } from './models/symptom';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import {ProgressBarService} from './services/progress-bar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'coronareportfrontend';
  /*symptoms: Symptom[] = [];
  private apiSubscription: */

  public progressBarActive$$ = this.progressBarService.progressBarActive$$;

  constructor(private apiService: ApiService,
              private progressBarService: ProgressBarService) {

  }

  ngOnDestroy(): void {
    /*this.apiSubscription.unsubscribe();*/
  }

  ngOnInit(): void {
    this.progressBarActive$$.subscribe(val => console.log('Progressbar state: ' + val));
    /*this.apiService.getSymptoms()
      .subscribe(symtpoms => this.symptoms = symtpoms);*/
  }
}
