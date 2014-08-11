module.exports = ObserverStack

function ObserverStack(observable) {
    var listeners = []
    var lastValue = observable()

    observer.remove = observable(notify)

    function notify(value, isRevert){
        lastValue = value
        var top = listeners[listeners.length-1]
        if (typeof top === 'function') {
            top(value, isRevert)
        }
    }

    return observer

    function observer(listener) {
        if (!listener) {
            return lastValue
        }

        listeners.push(listener)

        return function remove() {
            var index = listeners.indexOf(listener)
            listeners.splice(listeners.indexOf(listener), 1)
            if (index === listeners.length){
                notify(lastValue, true)
            }
        }
    }
}