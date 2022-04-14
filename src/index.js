// import { Observable } from "rxjs";
// import { interval } from "rxjs";
// import { timer } from "rxjs";
// an instance of an observable emmiting data to an observer
// const observable = new Observable((subscriber) => {
//   const id = setInterval(() => {
//     subscriber.next("testing...");
//     console.log(`leak of memo`);
//   }, 1000);

//   // subscriber.complete();

//   return () => {
//     clearInterval(id);
//   };
// });

// interval operator with the similar functionality as the observable we have imperatively written above
// const observable = interval(2000);
// const observable = timer(0, 500);
// using subscribe method to pass the data to observer
// saving to the subscription, so that we can unsubscribe from the observable
// const subscription = observable.subscribe(
//   //   {
//   //   next: (value) => {
//   //     console.log(value);
//   //   },
//   //   // completion indication
//   //   complete: () => {
//   //     console.log(`complete called in observable`);
//   //   },
//   //   // error handling
//   //   error: (err) => {
//   //     console.error(err);
//   //   },

//   // }
//   console.log
// );

// unsubscribe after 4 seconds
// setTimeout(() => {
//   subscription.unsubscribe();
// }, 4000);

// An ex. of a syncronous observable
// an instance of an observable emmiting data to an observer
// const observable = new Observable((subscriber) => {
//   // calling mutiple nexts
//   subscriber.next("Hello hobbit");
//   subscriber.error("Test error");
//   subscriber.next("Ready to visit the Middle Earth?");

//   // manually terminating the observable, to prevent the memo leak
//   subscriber.complete();
//   // won't run
//   subscriber.next("Or MORDOR?");
// });

// // fromEvent operator
// import { fromEvent } from "rxjs";

// const observable = fromEvent(document, "click");
// const subscription = observable.subscribe(console.log);

// of, from operators
// import { of, from } from "rxjs";

// // const observable = of([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
// // const observable = from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
// // const observable = from("LOTR");
// const observable = from(fetch("https://jsonplaceholder.typicode.com/todos/1"));

// // const subscription = observable.subscribe(console.log);
// const subscription = observable.subscribe({
//   next(value) {
//     console.log(value);
//   },
//   complete() {
//     console.log(`Complete!`);
//   },
// });
// console.log(`hello`);

// import { of, from } from "rxjs";
// import { map } from "rxjs/operators";

// // original observable
// const observable = of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
// // cloned observable
// // const cloneObservable = observable.pipe(map((value) => `${value}$`));

// // subscribing to the original observable with the observer
// const subscription = observable.subscribe({
//   next(value) {
//     console.log(value);
//   },
//   complete() {
//     console.log(`DONE`);
//   },
// });

// // // subscribing to the clone observable with yet another observer
// // const subscription2 = cloneObservable.subscribe({
// //   next(value) {
// //     console.log(value);
// //   },
// //   complete() {
// //     console.log(`DONE`);
// //   },
// // });

// console.log(`Here`);

// import { of, from, fromEvent } from "rxjs";
// import { map, pluck, filter } from "rxjs/operators";
// // listening or a keydown event on the doc
// const observable = fromEvent(document, "keydown").pipe(
//   // map((event) => event.code)
//   // pluck("code"),
//   // filter((code) => code === "Space")
//   map((event) => event.code === "Space" && "Space")
// );

// // subscribing to the original observable with the observer
// const subscription = observable.subscribe({
//   next(value) {
//     console.log(value);
//   },
//   complete() {
//     console.log(`DONE`);
//   },
// });

// // reduce, take, scan operators
// // import { of } from "rxjs";
// import { interval } from "rxjs";
// import { reduce, take, scan, tap } from "rxjs/operators";
// // listening or a keydown event on the doc
// // const observable = of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10).pipe(
// const observable = interval(200).pipe(
//   take(5),
//   // tap((val) => console.log(val)),
//   // tap(console.log),
//   tap({
//     next(val) {
//       console.log(val);
//     },
//   }),
//   reduce((acc, val) => acc + val, 0)
//   // scan((acc, val) => acc + val, 0)
// );

// // subscribing to the original observable with the observer
// const subscription = observable.subscribe({
//   next(value) {
//     console.log(value);
//   },
//   complete() {
//     console.log(`DONE`);
//   },
// });

// import { fromEvent } from "rxjs";
// import { map } from "rxjs/operators";
// import { ajax } from "rxjs/ajax";
// // listening or a keydown event on the doc
// // const observable = of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10).pipe(
// const observable = fromEvent(document.querySelector("#btn"), "click").pipe(
//   map(() => {
//     return ajax.getJSON("https://jsonplaceholder.typicode.com/todos/1");
//   })
// );

// // subscribing to the original observable with the observer
// const subscription = observable.subscribe({
//   next(value) {
//     // console.log(value);
//     // as value is an observable we should subscribe to it first to get the final value
//     value.subscribe(console.log);
//   },
//   complete() {
//     console.log(`DONE`);
//   },
// });

// // using mergeMap operator to flatten the observables
// import { fromEvent, interval } from "rxjs";
// import { map, mergeMap, take, tap } from "rxjs/operators";
// import { ajax } from "rxjs/ajax";
// // listening or a keydown event on the doc
// // const observable = of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10).pipe(
// const observable = fromEvent(document.querySelector("#btn"), "click").pipe(
//   mergeMap(() => {
//     // return ajax.getJSON("https://jsonplaceholder.typicode.com/todos/1");
//     return interval(1000).pipe(tap(console.log), take(5));
//   })

//   // take(5)
// );

// // subscribing to the original observable with the observer
// const subscription = observable.subscribe({
//   next(value) {
//     // no need to subscribe to a value as mergeMap handles that for us
//     console.log(value);
//   },
//   complete() {
//     console.log(`DONE`);
//   },
// });

// // using switchMap operator to flatten the observables
// import { fromEvent, interval } from "rxjs";
// import { map, switchMap, take, tap } from "rxjs/operators";
// import { ajax } from "rxjs/ajax";
// // listening or a keydown event on the doc
// // const observable = of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10).pipe(
// const observable = fromEvent(document.querySelector("#btn"), "click").pipe(
//   switchMap(() => {
//     // return interval(1000).pipe(
//     return ajax.getJSON("https://jsonplaceholder.typicode.com/todos/1").pipe(
//       take(5),
//       tap({
//         complete() {
//           console.log(`Inner observable has completed`);
//         },
//       })
//     );
//   })

//   // take(5)
// );

// // subscribing to the original observable with the observer
// const subscription = observable.subscribe({
//   next(value) {
//     // no need to subscribe to a value as switchMap handles that for us
//     console.log(value);
//   },
//   complete() {
//     console.log(`DONE`);
//   },
// });

// // using concatMap operator to flatten the observables
// import { fromEvent, interval } from "rxjs";
// import { map, concatMap, take, tap } from "rxjs/operators";
// import { ajax } from "rxjs/ajax";
// // listening or a keydown event on the doc
// // const observable = of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10).pipe(
// const observable = fromEvent(document.querySelector("#btn"), "click").pipe(
//   concatMap(() => {
//     // return interval(1000).pipe(
//     return ajax.getJSON("https://jsonplaceholder.typicode.com/todos/1").pipe(
//       take(5),
//       tap({
//         complete() {
//           console.log(`Inner observable has completed`);
//         },
//       })
//     );
//   })

//   // take(5)
// );

// // subscribing to the original observable with the observer
// const subscription = observable.subscribe({
//   next(value) {
//     // no need to subscribe to a value as concatMap handles that for us
//     console.log(value);
//   },
//   complete() {
//     console.log(`DONE`);
//   },
// });

// using exhaustMap operator to flatten the observables
import { fromEvent, interval } from "rxjs";
import { map, exhaustMap, take, tap } from "rxjs/operators";
import { ajax } from "rxjs/ajax";
// listening or a keydown event on the doc
// const observable = of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10).pipe(
const observable = fromEvent(document.querySelector("#btn"), "click").pipe(
  exhaustMap(() => {
    // return interval(1000).pipe(
    return ajax.getJSON("https://jsonplaceholder.typicode.com/todos/1").pipe(
      take(5),
      tap({
        complete() {
          console.log(`Inner observable has completed`);
        },
      })
    );
  })

  // take(5)
);

// subscribing to the original observable with the observer
const subscription = observable.subscribe({
  next(value) {
    // no need to subscribe to a value as exhaustMap handles that for us
    console.log(value);
  },
  complete() {
    console.log(`DONE`);
  },
});
