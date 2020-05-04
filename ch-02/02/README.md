# Subject
Subject is both an observer and observable.

```javascript
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

    this.subject.subscribe(x => console.log("Second subscribed: ", x));
    this.subject.next(4);
  }

  ngOnDestroy() {
    this.subject.unsubscribe();
  }
}

// output
First subscribed: 1
First subscribed: 2
First subscribed: 3
First subscribed: 4
Second subscribed: 4
``` 

NOTE: Subjects are `sharable` but are not `reusable`. Remember, if you call `error` or `complete` on subject
it is dead, you can not use it again and if you try it will silently ignore you. 

```javascript
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

// output
First subscribed: 1
First subscribed: 2
First subscribed: 3
```

So, instead of `complete` use `unsubscribe` when you are finished with subject. That way if you accidentally call
the subject again, at least you will get an error message to let you know.
