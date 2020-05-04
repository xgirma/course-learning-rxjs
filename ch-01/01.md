# Asynchronous and Reactive Programming
Asynchronous means not occurring at the same time. At first asynchronous makes JavaScript runs fast.

## Callbacks
Callback wait for this to complete before continuing.
```javascript
function waitForData(options, callback) {
    // Request data from a server
    client.get('http://my-data-server' + options, function(response) {
        // once the data is received, continue executing the code
        callback(response);
    })
}
``` 
Callback hell. 

## Promise
A promise is like a placeholder, we could return a Promise, which would let us know we are waiting on something.
```javascript
var promise = new Promise((resolve, reject) => {
    if (/* we get some date */) {
        resolve("it worked");                        
    } else {
        reject(Error("didn't work"));
    }
});
``` 

Promise gave us a method called `then` which is triggered signalling that the Promise operation has completed. 
```javascript
promise.then((result) => {
    console.log("it worked");
}, (error) => {
    console.error(error);
});
```

We out grow Promise to because of a buzz word called `Real Time`. Real time update, analytics, and data. 

We can use Promise for `Real Time`, but `we can only use each Promises once`.

## Observable
Observable is a `reusable` Promise that keep listening after the `then` method.

So you can wait for something to happen, respond, then keep listening, for the things to happen again.

```javascript
var observable = Rx.observable.create( observer => {
    observer.next(1)
    observer.next(2)
    observer.next(3)
    observer.complete()
});
```  

Every time your observer fires `.next()` your subscribe function will go again. 

```javascript
observable.subscribe(
    value => console.log(value);
    error => console.error(error);
    () => console.log("This is the end.");
);
// output
1
2
3
This is the end.
```

Instead of `then`, observables have a `subscribe` method, which will listen for Real Time updates, and respond each time.
