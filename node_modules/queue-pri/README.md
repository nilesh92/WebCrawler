# [![npm version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![dependency status][dm-image]][dm-url]

# Priority Queue Data Structure

## Description

This is a javascript implementation of a
[priority queue](http://en.wikipedia.org/wiki/Priority_queue)
data structure.

A simple queue data structure models the notion of 'First in First Out', or
FIFO&mdash; image the line at the grocery store.  The first item to be removed
from a queue is the first item placed in the queue.  Basically, the order in
which items are placed in the queue is the only factor that determines thier
placement; there is no notion of 'priority'.

A priority queue differs from a simple queue in the way the items are added to
the queue.  Each item in a priority queue has a 'priority' associated with it
that determines where in the queue it is to be inserted.  Items with a 'higher
priority' are inserted ahead of those that have a 'lower priority'.  Items with
the same priority are inserted in the order they are added.

This particular implementation utilizes a
[linked list](https://www.npmjs.com/package/dbly-linked-list) as the
underlying data structure.  This offers several benefits.

* We can leverage the work that has already been done to implement the
  linked list.

* This lends itself to a level of composition and abstraction which greatly
  simplifies this implementation.  It provides a wrapper around only those
  methods of the linked list that we need to construct the properties of a
  queue data structure.

* The 'queue' or 'dequeue' operations can be completed in O(1) time.

* No additional overhead is required to 'resize' the data structure to add
  more elements to the queue.  When elements are 'queued' up in the queue, the
  underlying linked list will adjust its size dynamically.

*For specific examples and documentation, see the below sections*

### Motivation:

The main purpose of this project is revisit the basics, and focus on the
development process.

*I wholehearedly acknowledge that the basic data structure space is populated
with well-written code and efficient implementations, and one could easily grab
one of those libraries and integrate it in their project.  However, the main
difference between those libraries/implementations and this one is that this is
the best implementation I have ever written.  My hope is that someone else will
find this useful, but understand, this code is not the goal; this will simply
be a useful bi-product of the journey.  The underlying motivation is to
understand and, more importantly, learn from the process to get to the desired
end-state&mdash;for me it is all about the joy of the journey.*

#### Environment:

Although this implementation is designed to be used with
[Node.js](http://www.nodejs.org), it could be used in other contexts with minor
modifications.  This implementation does not have any external dependencies
that would preclude it from being used in the browser--just include it with a
`<script>` tag and it should be good to go.  _Disclaimer: I have not tested
this implementation in any other context/environment; only tested with node.js_

----

## Basic Usage

Install with npm :

```bash
npm install queue-pri --save
```
Basic usage example below.  _Note: it does not cover all the available
methods, rather just highlights the main functionality to get up and running
with this data structure. For a description of all the methods, see the
API section._

```javascript
var Queue = require('queue-pri');
var queue - new Queue();

queue.isEmpty();
// --> true

queue.enqueue('data item 1', 1);
queue.enqueue('data item 2', 1);
queue.enqueue('data item 3', 1);
queue.enqueue('data item 4', 1);
// queue contains:
// 'data item 1', <-- front
//  ... ,
// 'data item 4'

// Since all items have the same priority, the order they were
// added to the queue is maintained

queue.isEmpty();
// --> false

queue.size();
// --> 4

queue.clear();
queue.isEmpty();
// --> true

queue.enqueue('data item 2', 2);
queue.enqueue('data item 4', 4);
queue.enqueue('data item 3', 3);
queue.enqueue('data item 1', 1);
// queue contains:
// 'data item 1', <-- front
//  ... ,
// 'data item 4'

// NOTE: order is now based on priority, not the order the items
// were added to the queue

queue.dequeue();
// --> removes 'data item 1'

queue.peek()
// --> 'data item 2'

queue.size();
// --> 3

queue.clear();
queue.isEmpty();
// --> true
```

## API

**Available methods for a queue instance:**

* ### isEmpty()
    Determines if the queue is empty or not. Returns true if is empty, false
    otherwise.

* ### size()
    Returns the size of the queue, or number of items

* ### clear()
    Clears the queue of all data

* ### enqueue(data, priority)
    Adds a new item containing 'data' just before the node with a lower
    'priority'.

    An item is considered to be be a 'higher' priority if
    the priority is a smaller value than the one that follows.  For
    example, an item with priority '1' is considered higher priority than
    an item with priority '2'--the lower the number, the higher the
    priority.

    If a priority is not provided, it will default to null.

* ### dequeue()
    Removes the item from the front of the queue

* ### peek()
    Returns the data of the item at the front of the queue,
    but does not remove it

----
## License
MIT &copy; Jason Jones

[npm-image]:https://badge.fury.io/js/queue-pri.svg
[npm-url]:http://npmjs.org/package/queue-pri
[travis-image]:https://travis-ci.org/jasonsjones/queue-pri.svg
[travis-url]:https://travis-ci.org/jasonsjones/queue-pri
[dm-image]:https://david-dm.org/jasonsjones/queue-pri.svg
[dm-url]:https://david-dm.org/jasonsjones/queue-pri
