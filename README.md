## Description of the Section 9:

In this section we where working on RxJS, how we subscribe to Observables from Observer, how we create observables with creation operators, how we modify them with pipeable operators, how we flatten the inner observables with flattening operators and more.

## Topics covered in Section 9:

- Brief intro to RxJS & Parcel
- Observable, observer and subscription process
- How Observables emmit data and observers subscribe to themselves
- next(), complete() and error() functions in observer
- Unsubscribe from the Observable using unsubscribe method for observer
- Imperative vs Declarative programming
- RxJS creation operators [timer, interval, fromEvent, of, from(flattening), ajax]
- pipe operator for passing observable through ech operator defined within it
- RxJS pipeable operators [map, pluck(DEPRECATED), filter, reduce, scan, take, tap, ]
- How to create different instances of observables modified through pipe
- Exploring marble diagrams for operators in RxJS doc
- How the subscriptions should be handled from the pipeline rather than the observer using flattening operators
- Flattening operators [mergeMap, switchMap, concatMap, exhaustMap]

## Notes for the entire Section 9:

## vid.118

There is one questing to be asked before we send data to our component. Should components be responsible for handling raw data for handling async operations? NO! Before feeding data to a component we should 1st process it. We need a solution for acting as a middleman between the response from the async operation and a component. This is where the RxJS comes into play. It's a library for filtering, sorting, and coordinating data. Angular team itself recommends RxJS

Parcel is a zero config application bundler (no need to configure it). Unlike the webpack, parcel works out of the box. Parcel is relevant only for this section, and won't be used with angular in future sections. When we run npm start, parcel will bundle our files and launch our dev server + watch for changes

## vid.119

Observable is like a wrapper around a data source. Data can come from any async operation (mouse events, key events, file uploads, http request, etc.). Other than being async, it's not definitive as when the data came from the sources. When the data is emmited from the sources, we can capture the data before handing it of wherever it's needed. Observable gives us the opportunity to filter, sort and coordinate data. By wrapping a data source we can further refine the data. We call the observables, bec we can observe the data emmited from a source. We can observe observables with objects, called observers, which are responsible for receiving data after an observable has emmited the data. An observer establishing a connection with an observable is called a subscription. In RxJS we can use multiple observers to connect to one observable. By allowing multiple subscriptions multiple locations in our app can be fed the same stream of data. If we format a data from within the observable, every observer will be given the same formatted data, and the later ones don't have to worry about formatting. This allows us to separate the responsibilities. Observables aren't conserned what observers will do with the data after they pass it.
1st import the Observable package to be able to create a new observable. then create an instance of an observable. After creating it we need to store a reference to it. The instance would have a function called subscribe, which will allow us to pass an observer, an object. In that object we must define a method called next, which is responsible for handling the data pushed from the observable and has one param called value, which in turn referes to a data emmited by the observable. Observers wouldn't receive the data regardless of a subscription. So as a last step we should update our observable to push data to our observer. In the new instance pass a function, where we should emmit data to our observers. The function has a param called subscriber, which is an object that's interacting with the observers and where we can emmit data, throw errors or tell observers that we've finished emmiting the data. Run the subscriber.next() function and pass a value to next() to emmit it. The relation between observables and observers is push based. Observers don't have control over when data is emmited by an observable. It's up to an observable to push data. If we don't call the next function the observer function won't run.
// EX.
const observable = new Observable((subscriber) => {
subscriber.next("Hello hobbit");
});
observable.subscribe({
next: (value) => {
console.log(value);
},
});

## vid.120

the job of the observer is to read vals as they're pushed. The object that we pass to an observer can have up to 3 funtions. 1 function for handling emmited vals, 1 for handling errors, lastly 1 for completion of the observable. next function handles the values pushed from the observable. We can push multiple values over time, hence also refered as a stream of data. Inside of the observable we can call numerous next functions with differenct messages. Observables don't push data all at once. This allows us to push data over time. Observables will constantly run by def. and won't be terminated, causing a memo leak. To manually cause it to stop use complete on the subscriber. It will prevent further data push. By calling the complete function in observer, observer will be notified of the observables data push completion. No value is passed to this function. Finally we can define an error function, that accepts an error arg which stores the error produced by the observable. We can push an error manually from the observable using .error() method. Note that in this case if an error is thrown from an observable RxJS will terminate the observable, and no new value would be emmited. Observers can be partial, meaning that we don't have to define all 3 functions in our observable. RxJS will run dummy functions, that won't do anything, if you skip any of them.

## vid.121

Typically most observables are async. Note: Completing the observable doesn't mean that contents of that observable have been cleared (ex. memo can still be allocated for an interval). We should free this memo if the observable isn't running. WE ARE RESPONSIBLE FOR CLEANING THE MEMO FOR THE OBSERVABLE! We can return a function from an observable to handle the cleaning up async operations

## vid.122

It's considered a good practice to complete an observable when we don't need it anymore. On the other hand there might be a situation where we need our observable to run forever, while other observers subscribe to it. When an observer doesn't need to listen for an observable we can unsubscribe using that observer without interupting others. Removing complete() method will run the observable infinitely and we now can unsubscribe from it.
An observer returns an obj called subscription. A Subscription is an object that represents a disposable resource, usually the execution of an Observable. A Subscription has one important method, unsubscribe, that takes no argument and just disposes the resource held by the subscription. to use it store the result of the observer in a var called subscription, and use unsubscribe() method on it.
So the function returned by the observable will be executed when the observable completes or the observer unsubscribes

## vid.123

The RxJS team reccomends writing observables declaratively. In most cases you won't have to create observables manually. Instead there a re functions for handling this for us.
Imperative programming - How?
Declarative programming - What?
Ofcourse underneath the declarative progr. there is an imperative abstraction. We can simplify our imperatively written observable to a declarative one with operators.
OPERATORS = FUNCTIONS
RxJS exports operators, the purposes of which are to help us control an oservable stream of data. There are two types of operators, creation and pipeable
Creation operators - create new observables
Pipeable operators - take an observable as an input and output a new more polished one

## vid.124

Reminder: A creation operator is the one used to create an observable. It'll act as a wrapper around a producer of data such as events, timers or a combin of other observables. It allows us to create observables from any source of data.
An interval operator is used for creating an Observable that emits sequential numbers every specified interval of time (similar to setInterval). 1st import it from the rxjs, and then use it instead of new instance of the observable. It will create an interval wrapped with an observable and return an observable as a value. This is the declarative solution. We have to pass the duration time to the interval operator as an argument in ms, and it will print numbers every given ms. Note that interval would go forever unless you unsubscribe from it or call complete
We can pass single function to a subscribe function instead of an object of 3 functions, and it will be registered as a next function.
The timer operator is more custimizable than the interval operator. It also emmits a stream of numbers to the observer. 1st arg we pass is the interval after which the initial number should be emmitted. Pass 0 to start immediately. 2nd arg is for the duration after which the next number value would be emmited; not applied to the first value. Not passing it will only emit one initial value

## vid.125

fromEvent - Creates an Observable that emits events of a specific type coming from the given event target. The 1st arg for this operator is a target that the observable should watch in doc. 2nd arg is the name of the event (any event in JS). So using the fromEvent operator we can create an observable out of the event. Each subscription would be given it's own handler. Each time we call the subscribe function a new event listener is created for each subscription. This allows for other subscriptions to remain functional and uninterrupted. As usual, observable will listen for the given event until the user closes the app. Again if we don't want to listen for an event any further we should instruct it, otherwise fromEvent will continue listening and cause a memo leak. For now we can use unsubscribe method for that.

## vid.126

of operator - Converts the arguments to an observable sequence. Each argument becomes a next notification. it will loop through the values passed into it and is syncronous by nature. Note that values aren't emmited until a subscription occures. The of operator won't immediately push the values we supply into its args. Once the values have been pushed the of operator would complete the observable. The of operator is an ex of an operator that performs a complete phase. the of operator doesn't loop through the array. It will simply return the array. As we know flattening an array is when a deeply nested array is reduced to a simpler array.
from operator - Converts various other objects and data types into Observables. We can pass arrays, objs, promisses and itterables. It can flatten an array that we pass to it. Each item from the passed array would be pushed. It can flatten a string as well. Technically the fetch function returns a promise however the from operator will flatten or wrap the response for us.

## vid.127

A lot of operators in RxJS are pipeable operators. Unlike the creation operators pipeable operators are concerned with transforming, filtering and combining data. They can perform various actions on a stream of data before it gets pushed to an observer. Applying a pipeable oper is simple. It must be supplied with an observable. The output of a pipeable operator is another observable, so we can subscribe to a newly created and polished observable.
Writing an observable can be tricky. 1st we need to create a new observable. 2nd a new operator function. Pipeable operators don't accept an assertable right away, we need to configure them. The function returned by the operator will be able to handle accepting and returning an observable. We can pass on our observable to the function. The new observable should be stored in a var. If we want to apply multiple operators, we would have to repeat the last 2 steps. It's too complex and not commonly used way. Luckily there is a simpler syntax for that. Observables have pipe method for composing operators. Instead of managing the observables the pipe function would handle passing on the observable to each operator in the pipe function. This feature leaves us with handling creating the operator with its config settings. The word pipeable comes from having to pass these operators into the pipe function. The pipe function will apply the operators in the order they're passed in. In the end the pipe function will spit out an observable. We can directly subscribe to the pipe function and start listening for the values. Whenever a new val is passed from the original observable it will make its way down the pipeline. Eventually it will reach the observer. Operators are pure and have no impact on the original observable. Theoretically we can create another subscription directly on the original observable. We can even compose a different set of observables.

## vid.128

map operator will handle the transforming a value pushed from the observable. It's similar to the map function for the arrays. The main diff is that it'll work with the observables instead of arrays. Every observable obj has a method called pipe. It's a common practice to chain it on the observable. Inside it we can compose operators after importing them. Operators that can be composed can be found under the rxjs/operators package
// EX.
import {map} from "rxjs/operators";
Now we can call them inside the pipe function. We can configure the map operator by passing a callback function to it which accepts the value pushed from the observable. Note that of operator will push value one at a time. Each time a value is pushed it will go through a pipe function, and the map operator will be given each value, which represents a single value. It doesn't represent every value all at once. We must return a modified value from this function. The observer isn't receiving the values directly from the original observable. Instead it subscribes to the observable returned by the map function. In this case original observable remains intact. If we want we can subscribe to the original observer and keep our new observable by breaking the pipe into a different variable. To do that we can assign our observable chained with the pipe to a new var. Like that we would have 2 observables. Now we can choose to subscribe to the original observable or to the one with the pipe that modifies the observable.
So we can create a single observable, yet emmit different values by chaining different pipe functions. There is an unlimited # of observables we can compose from a single observable

## vid.129

In almost any page of the RxJS doc you would find a marble diagram to help dev understand how the operator works. It's a visual repres of how an operator behaves, showing inputs at the top and outputs at the bottom. Marbles are the circles with the values inside showing the input at the top and the output modified by the operator right below in another time line after the operator example

## vid.130

The pluck operator was used to grab a specific value from an object. The arg for the function is the name of the prop inside an object. It's now DEPRECATED. Most of the time you'll find yourself defaulting to the map operator, but note that there might be some other opertators better suited for the operation that you're trying to accomplish.

## vid.131

filter operator - stop observable from pushing a value by setting a condition. Same as JS filter method. We can add additional operators to pipe functions as arguments. It will accept infinite number of args. Note that in this case order does matter, as the value modified by one operator is passed to the next one, and the latter one receives a modified value. Filter operator gives us a power to limit the values emmited from the observable. Note that whenever possible we should always strive to write multiple operators. It's inadvisable to use a single operator for multiple tasks. We want our operators to be specific as much as possible. Note that writing our entire pipeline in map makes it hard for other devs to understand the process and makes it hard to swap.

## vid.132

reduce operator - similar to array's reduce method in JS. We can use it for accumulating values emmited from the observable. Everytime a val is emmited reduce operator will take in a value until the next value is emmited. Once the observable completes, the reduce operator would push a single value onto the observer. The reduce function is passed a callback function with an accumulator and a value emmited by the observable and an optional seed value (initial value to begin with). Note that reduce waits until the observable stops emmiting the value, and only then returns an accumulated value. The problem arises if an observable never terminates.

## vid.133

take operator - Takes the first count values from the source, then completes. The argument we pass indicated the number of values it should receive from the observable before completing. Note that take and reduce operators work well together. In some cases we want to view the accumulated value as it's updated in real time. There is an alternative operator to reduce that behaves the same way, called scan. The difference is that the accumulated value would be pushed to the next operator or observer, so it doesn't wait for an observable to complete (can be useful to view the accumulated value over time). The args for the scan operator are the same as for the reduce.

## vid.134

tap operator - Used when you want to affect outside state with a notification without altering the notification. Mainly used for debugging the pipeline it's used in. We can use this operator with other operators in a pipeline to observe their return values. Note that tap operator doesn't affect the underlying stream of data. If we attempt to change a value those changes will be ignored. Instead of passing a function we can pass in an object with a next, complete, and error functions. We can secretly insert an observer like obj without having to subscribe to the observable

## vid.135

flattening an array will make things easier if we attempt to loop through a deeply nested array. Flatenning is a concept we can apply to the observables. What if we encounter nested observables? Creating an observable from another observable is possible. An ajax is a spec operator for initiating the http requests like get, post, etc. The ajax operator is a creation operator. We can't add it to the pipeline, and instead call it from within a pipeable operator. Handling click events and performing http requests are async operations. We should create these events with observables. Creating observables is simple, however handling their output vals is another story. In pipe function as it will create and return an observable we need to subscribe to two different observables(click, request). In the subscribe function's next functions we can subscribe on the value argument instead of handling it directly. The problem is solved but not entirely. Our code can get a nightmare by constantly subscr. to observables from within the observer. The observer shouldn't have to subscribe to multiple observables, and given a final value. This is where the flattening operators are used. They can subscribe to an observable emmited from within a pipeline. If the observable emmits a value the value will be passed on to the next operator in the chain or to the observer. Therefore the observer never has to care about subscribing to multiple observables. The subscriptions are handled from the pipeline rather than the observer. RxJS has some flattening operators to be used in these kind of situations.

## vid.136

mergeMap operator - Projects each source value to an Observable which is merged in the output Observable. Maps each value to an Observable, then flattens all of these inner Observables using mergeAll. It will subscribe to an observable if it's returned by the functions passed into it. Whatever the inner observable emmits a val the val will be pushed onto the next operator or observer. Let's say we pass an interval operator that returns an observable to mergeMap. Each time it emmits a value the value gets outputted. The subscription occures internally, and there is no limit to how many subscr can be made from within the mergeMap oper. This can put us in a situation with memo leak. Note that map and mergeMap operators are similar. They'll allow us to interact with a value emmited by an observable. The main diff is that mergeMap will subscribe to an observable returned by a function. Even though we're returning an observable the mergeMap subscribes to the observable. Values pushed by the observable are pushed to the observer. If we don't need an observable anymore, we should complete it. The mergeMap oper. won't impose a limit on active observables. We are responsible for managing the inner observables. Once the outer observable completes values aren't emmited

## vid.137

switchMap operator - similar to mergeMap. Inner observables are auto subscribed by this oper. Values emmited by the inner observable are pushed as the output. The differences between switchMap and mergeMap come from how they manage inner observables. The mergeMap won't limit the # of active inner observables, but the switchMap will limit them to 1. If a new value is pushed to the pipeline a new observable would be created. The switchMap would realize that there is already an active observable. The prev observable would be completed and the new one would become active. Values emmited by the new observable are pushed from the operator. Prev observables would have their values ignored if they attempt to emmit values, that's why switchMap is considered one of the safest flattening operators. We are still responsible for completing the last active inner observable. The args for the switchMap are the same as mergeMap operator. One realistic scenario for this operator is to handle the requests. If you create an app that constantly makes requests, managing requests is critical, and if two requests overlap it can cause an unexpected behavior. If we had 2 reqs to the same resource we might get mixed results, so we should always cancel the prev req to prevent the conflicting results.

## vid.138

concatMap operator - another operator for flattening an observable. Inner observables are auto subscribed by this operator. Values emmited by the inner observable are pushed to the stream. Similar to switchMap this operator will limit the number of active observables to 1 however the difference is in how they treat newer subscriptions. Instead of canceling the prev observable, this operator will places the observables into a queue. The next observable in the queue won't be subscribed to until the current active observable has been completed. This operator can be helpful when you want to give every observable a chance to emmit the values. Be warned that if an inner observables are left unmanaged you can potentially face a jam of observables. The concatMap operator is great for queueing the observables with a finite lifespan. We can have a single active eobservable without canceling the previous observables. We're still responsible for completing them.

## vid.139

exhaustMap operator - another flattening operator that subscribes to inner observables. Values emmited by the observable are pushed to the stream. What sets it apart is that it will ignore incoming observables if there already is an active observable. Not widely used one, but useful if you want to wait for current observable to complete before moving on. Ex. If you develop. a form you may want to prevent the duplicate submittions during the request. You can use the exhaustMap to avoid multiple reqs from occuring while the initial request is being processed. All the flattening operators have the same args. Be careful with this operator. If you don't want your observables to be ignored, you may want to look for a different operator. This operator might be usefult for preventing users from spamming the form submittions.

## vid.140

Recap:
The overall goal of the flattening operators is to subscribe to the inner observables. Their values would be pushed on to the next operator.
Restaurant order analogy:
switchMap - stop working on the current order and start working on the new order. Only the latest order gets completed
concatMap - order gets added to the queue and you continue working on the current order
mergeMap - working on all orders in parallel
exhaustMap - ignore new orders and finish current one. Once finished new order can be accepted.
