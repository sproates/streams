
/** @module Stream */

/**
 * Stream constructor.
 * @constructor
 * @param {mixed} head First value in the stream.
 * @param {function} tail Function returning the remainder of the stream.
 * @returns {Void} Use it as a constructor.
 */
function Stream(head, tail) {
    var self = this;

    //self.data = new ListNode(head, tail);
    self._head = head;
    self._tail = function() {
        return tail;
    }
    self.cache = {};

    function ListNode(head, tail) {
        var self = this;

        self.head = head;
        self.tail = function() {
            return tail;
        };
    }
}

/**
 * Static methods.
 */

/**
 * Create a stream (ideally of numbers) starting at x and incrementing by step.
 * @param {mixed} x First value in the stream.
 * @param {integer} [step=1] The increment.
 * @returns {Stream}
 */
Stream.from = function(x, step) {
    var _step = typeof step !== 'undefined' ? step : 1;
    var next = x + _step;

    return new Stream(x, function() {
        return Stream.from(next, step);
    });
};

/**
 * Create a stream by attaching an existing stream to a value.
 * @param {mixed} x First value in the stream.
 * @param {Stream} stream The stream to attach.
 * returns {Stream}
 */
Stream.cons = function(x, stream) {
    return new Stream(x, function() {
        return stream;
    });
};

/**
 * Create a stream by iteratively applying a function to the previous value in the stream.
 * @param {mixed} x First value in the stream.
 * @param {function} f The function to apply.
 * @returns {Stream}
 */
Stream.iterate = function(x, f) {
    var prev = x;
    return new Stream(x, function() {
        var next = f(x);
        return Stream.iterate(next, f);
    });
};

/**
 * Create a stream as the cumulative sum of another stream.
 * @param {Stream} The source stream.
 * @param {Number} [acc=0] Accumulator.
 */
Stream.sum = function(s, acc) {
    var _acc = typeof acc !== 'undefined' ? acc : 0,
       left = typeof s === 'function' ? s() : s;

    return Stream.cons(left.head() + _acc, function() {
        return Stream.sum(left.tail(), left.head() + _acc);
    });
};

/**
 * Instance methods.
 */

/**
 * Determines whether or not the stream is empty.
 * @returns {Boolean}
 */
Stream.prototype.isEmpty = function() {
    var self = this;

    return (typeof self._head === 'undefined' || self._head === null);
};

/**
 * Determines whether or not the stream is finite.
 * returns {Boolean}
 */
Stream.prototype.isFinite = function() {
    return false;
};

/**
 * Get the head of the stream.
 * @returns {Mixed}
 */
Stream.prototype.head = function() {
    var self = this;

    if(self.isEmpty()) {
        throw new Error('Can\'t get the head of an empty stream');
    }

    return self._head;
};

/**
 * Get the tail of the stream.
 * @returns {Stream}
 */
Stream.prototype.tail = function() {
    var self = this;

    if(self.isEmpty()) {
        throw new Error('Can\'t get the tail of an empty stream');
    }

    return self._tail();
};

Stream.prototype.map = function(f) {
    var self = this;

    if(self.isEmpty()) {
        return self;
    }
    return new Stream(f(self.head()), function() {
        var t = self.tail();
        while(typeof t === 'function') {
            t = t();
        }
        return t.map(f);
    });
};

Stream.prototype.take = function(n) {
    var self = this;

    if(self.isEmpty()) {
        return self;
    } else if(!n) {
        return new Stream();
    } else {
        return new FiniteStream(self.head(), function() {
                return self.tail()().take(n - 1);
            }
        );
    }
};

Stream.prototype.takeWhile = function(f) {
    var self = this;

    if(self.isEmpty()) {
        return self;
    } else if(!f(self.head())) {
        return new Stream();
    } else {
        var s = new Stream(self.head(), function() {
                return self.tail()().takeWhile(f);
            }
        );
        if(f(s.head())) {
            return new FiniteStream(s.head(), s.tail());
        } else {
            return new FiniteStream(self.head(), self.tail())
        }
    }
};

Stream.prototype.forEach = function(f) {
    var self = this;

    if(!self.isFinite()) {
        throw new Error('Cannot forEach an infinite stream');
    }

    var i;
    for(i = 0; true; i++) {
        try {
            var s = self.get(i);
            f(s);
        } catch(error) {
            break;
        }
    }

    return self;
};

Stream.prototype.get = function(index) {
    var self = this,
        tail = self._tail();

    if(self.cache.hasOwnProperty(index)) {
        return self.cache[index];
    }

    if(index < 0) {
        throw new Error('Index must be non-negative');
    }

    if(this.isEmpty()) {
        throw new Error('Can\'t get from an empty stream');
    }

    if(index === 0) {
        return self._head;
    }

    if(typeof tail !== 'function') {
        throw new Error('Malformed tail');
    }

    var next = tail();
    if(typeof next === 'function') {
        next = next();
    }
    if(next.isEmpty()) {
        throw new Error('Index out of bounds');
    }

    var got =  next.get(index - 1);
    self.cache[index] = got;
    return got;
};

Stream.prototype.zip = function(that) {
    var self = this;

    if(self.isEmpty()) {
        return that;
    } else if(that.isEmpty()) {
        return self;
    } else {
        return new Stream([self.head(), that.head()], function() {
            return self._tail()().zip(that.tail()());
        });
    }
};

Stream.prototype.length = function() {
    throw new Error('Cannot get the length of an infinite stream');
};

Stream.prototype.sumTerms = function(multiplier) {
    var self = this;

    return Stream.sum(self).map(function(value) {
        return value * multiplier;
    });
};

/**
 * FiniteStream is an extension of Stream.
 */

function FiniteStream(head, tail) {
    Stream.call(this, head, tail);
};

FiniteStream.prototype = new Stream();
FiniteStream.prototype.constructor = FiniteStream;

FiniteStream.prototype.isFinite = function() {
    return true;
};

FiniteStream.prototype.length = function() {
    var self = this;

    var f1 = function(s, acc) {
        if(s.isEmpty()) {
            return acc;
        }
        return 1 + f1(s.tail()(), acc);
    };

    return f1(self, 0);
};

module.exports = Stream;
