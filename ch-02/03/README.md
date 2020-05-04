# Behaviour subject
Remember our second subscriber? We did not get a console log and a second subscriber until the next was called later.
What if we wanted to `get the last value passed through the subject` as soon as we subscribe? 

Then we want to use the `behaviour subject`.

```javascript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject } from "rxjs";

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
    this.subject = new BehaviorSubject(0);
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
First subscriber: 0
First subscriber: 1
First subscriber: 2
First subscriber: 3
Second subscriber: 3
First subscriber: 4
Second subscriber: 4
```

The behaviour subject requires initial value. 
