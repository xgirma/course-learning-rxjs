import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit{
  title = 'rxjs';
  observable;
  subject;

  ngOnInit() {
    this.subject = new Subject<number>();
    this.subject.subscribe(x => console.log("First subscribed: ", x));
    this.subject.next(1);
    this.subject.next(2);
    this.subject.next(3);
    this.subject.complete();

    this.subject.subscribe(x => console.log("Second subscribed: ", x));
    this.subject.next(4);
  }

  ngOnDestroy() {
    this.subject.unsubscribe();
  }
}