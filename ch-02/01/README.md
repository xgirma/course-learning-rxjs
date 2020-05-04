# Create an Observer
```javascript
import { Component } from '@angular/core';
import { Observable } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rxjs';

  constructor() {
    const observable = new Observable(subscriber => {
      subscriber.next(1);
      subscriber.next(2);
      subscriber.next(3);
      subscriber.complete();
    });

    console.log('just before subscribe');

    observable.subscribe({
      next(x) { console.log('got value ' + x); },
      error(err) { console.error('something wrong occurred: ' + err); },
      complete() { console.log('done'); }
    });

    console.log('just after subscribe');
  }
}
```
The observer/subscriber is just an object. It has three methods: `next`, `error`, and `complete`.

The subscriber is what you will use to listen to whatever you want to listen to. It could be a button, 
a search box, a remote data stream, anything.

## Memory leak
When you subscribe to an Observer it will keep listening for change. That is what we loved about Observer.
However, it will literally keep listening even if your user navigate to a different page.

Basically you really do not want to leave that subscribe open.

```javascript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit{
  title = 'rxjs';
  observable;

  ngOnInit() {
      this.observable = new Observable(subscriber => {
      subscriber.next(1);
      subscriber.next(2);
      subscriber.next(3);
      subscriber.complete();
    });

    console.log('just before subscribe');

    this.observable.subscribe({
      next(x) { console.log('got value ' + x); },
      error(err) { console.error('something wrong occurred: ' + err); },
      complete() { console.log('done'); }
    });

    console.log('just after subscribe');
  }

  ngOnDestroy() {
    this.observable.unsubscribe();
  }
}
```

Now we will not have any memory leak.
