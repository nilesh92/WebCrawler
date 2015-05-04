/* globals describe it beforeEach afterEach */

var should = require('should');
var PriorityQueue = require('../');

describe('Queue Unit Tests', function() {

    var queue;

    beforeEach(function () {
        queue = new PriorityQueue();
    });

    afterEach(function () {
        queue = null;
    });

    it('should have a working test environment', function() {
        true.should.equal(true);
    });

    it('should instantiate a queue instance', function () {
        queue.should.be.ok;
    });

    it('should be empty when first instantiated', function () {
        queue.isEmpty().should.equal(true);
        queue.size().should.equal(0);
    });

    it('should default priority to null if a priority is not provided', function () {
        queue.enqueue('some test data');
        var first = queue.dequeue();
        should.not.exist(first.priority);
    });

    it('should order list property with elements whose priority is not provided', function () {
        queue.enqueue('some test data');
        queue.enqueue('some higher pri test data', 1);
        var first = queue.dequeue();
        first.data.should.equal('some higher pri test data');
    });

    it('should queue up data with the same priority at the back of queue', function () {
        queue.enqueue('some test data', 1);
        queue.enqueue('some more test data', 1);
        queue.enqueue('and yet some more...', 1);
        queue.size().should.equal(3);
    });

    it('should queue up data in the correct order based on priority', function () {
        queue.enqueue('test data 5', 5);
        queue.enqueue('some more test data', 2);
        queue.enqueue('test data 8', 8);
        queue.enqueue('and yet some more...', 3);
        queue.enqueue('test data 6', 5);
        queue.enqueue('some test data', 1);
        queue.enqueue('test data 7', 6);
        queue.size().should.equal(7);
        var first = queue.dequeue();
        first.data.should.equal('some test data');
        var second = queue.dequeue();
        second.data.should.equal('some more test data');
        queue.size().should.equal(5);
    });

    it('should peek at the data at the front of the queue', function () {
        queue.enqueue('some more test data', 3);
        queue.enqueue('and yet some more', 2);
        queue.enqueue('some test data', 1);
        queue.enqueue('and even more data', 5);
        queue.size().should.equal(4);
        var first = queue.peek();
        first.data.should.equal('some test data');
        queue.size().should.equal(4);
    });

    it('should clear the queue of all data', function () {
        queue.enqueue('some more test data', 3);
        queue.enqueue('and yet some more', 2);
        queue.enqueue('some test data', 1);
        queue.enqueue('and even more data', 5);
        queue.size().should.equal(4);
        queue.clear();
        queue.size().should.equal(0);
        queue.isEmpty().should.equal(true);
    });
});
