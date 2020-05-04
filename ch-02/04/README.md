# Replay subject
What if you want to get all the values that have passed through a subject since the beginning? 

```javascript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReplaySubject } from "rxjs";

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
    this.subject = new ReplaySubject();
    this.subject.subscribe(x => console.log("First subscribed: ", x));
    this.subject.next(1);
    this.subject.next(2);
    this.subject.next(3);

    this.subject.subscribe(x => console.log("Second subscribed: ", x));
    this.subject.next(4);
  }

  ngOnDestroy() {
    this.subject.unsubscribe();
  }
}

// output
First subscriber: 1
First subscriber: 2
First subscriber: 3
Second subscriber: 1
Second subscriber: 2
Second subscriber: 3
First subscriber: 4
Second subscriber: 4
```
