observer-stack
===

Wrap an observable so that only the top most observer receives notifications.

## Install via [npm](https://npmjs.org/package/observer-stack)

```bash
$ npm install observer-stack
```

## Example

```
var Observ = require('observ')
var ObserverStack = require('observer-stack')

var val = Observ('test')
var pushObserver = ObserverStack(val)

function firstObserver(value, isRevert){
  console.log('first', value)
}

function secondObserver(value){
  console.log('second', value)
}

// add firstObserver to the stack
var remove1 = pushObserver(firstObserver)
val.set('test 1') // firstObserver will be called

var remove2 = pushObserver(secondObserver)
val.set('test 2') // only secondObserver will be called

remove2() // firstObserver will be called with the value and isRevert: true

val.set('test 3') // only firstObserver will be called


// clean up val() listener
pushObserver.remove()
```