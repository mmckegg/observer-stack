var test = require('tape')
var ObserverStack = require('../')
var Observ = require('observ')

test('push stacking', function(t){
  t.plan(6)

  var val = Observ('test')
  var stack = ObserverStack(val)
  var seq = 0

  var remove1 = stack(function(value, isRevert){
    t.equal(seq, 1, 'in sequence')
    t.equal(value, 'test 2')
    t.ok(isRevert !== true)
  })

  seq = 1
  val.set('test 2')

  var remove2 = stack(function(value, isRevert){
    t.equal(seq, 2, 'in sequence')
    t.equal(value, 'test 3')
    t.ok(isRevert !== true)
  })

  seq = 2
  val.set('test 3')

  seq = 3
  remove1()
  remove2()

  t.end()
})

test('reverting', function(t){
  t.plan(6)

  var val = Observ('test')
  var stack = ObserverStack(val)

  var seq = 0

  var remove1 = stack(function(value, isRevert){
    t.equal(seq, 2)
    t.equal(value, 'test 2')
    t.ok(isRevert)
  })

  var remove2 = stack(function(value, isRevert){
    t.equal(seq, 1)
    t.equal(value, 'test 2')
    t.ok(isRevert !== true)
  })

  seq = 1
  val.set('test 2')

  seq = 2
  remove2()

  seq = 3
  remove1()

  t.end()
})