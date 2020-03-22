import { DiaryEntryDto } from 'src/app/models/diary-entry';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.css']
})
export class DiaryComponent implements OnInit, OnDestroy {
  diaryEntries: DiaryEntryDto[] = [];
  private subs = new SubSink();
  panelOpenState: boolean;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.subs.add(this.route.data.subscribe(data => {
      console.log(data.diaryEntries);
      //this.diaryEntries = data.diaryEntries;
    }));
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
