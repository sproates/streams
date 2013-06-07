
var Stream = require('./stream.js');

exports.testFromSanity = function(test) {
    test.expect(1);

    var positiveIntegers = Stream.from(1);

    test.equal(typeof positiveIntegers, "object", "Stream.from(x) should return an object");

    test.done();
};

exports.testConsSanity = function(test) {
    test.expect(1);

    var positiveIntegers = Stream.from(1);
    var naturals = Stream.cons(0, positiveIntegers);

    test.equal(typeof naturals, "object", "Stream.cons(x, stream) should return an object");

    test.done();
};

exports.testMapSanity = function(test) {
    test.expect(1);

    var naturals = Stream.from(0);
    var odds = naturals.map(function(value) {
        return (value * 2) + 1;
    });

    test.equal(typeof odds, "object", "Stream.map(f) should return an object");

    test.done();
};

exports.testIterateSanity = function(test) {
    test.expect(1);

    var alternatingSignOnes = Stream.iterate(1, function(previous) {
        return -1 * previous;
    });

    test.equal(typeof alternatingSignOnes, "object", "Stream.iterate(x, f) should return an object");

    test.done();
};

exports.testTakeSanity = function(test) {
    test.expect(1);

    var naturals = Stream.from(0);
    var first5naturals = naturals.take(5);

    test.equal(first5naturals.isFinite(), true, "Stream.take(n) should return a finite Stream");

    test.done();
};

exports.testGet = function(test) {
    test.expect(5);

    var naturals = Stream.from(0);

    test.equal(naturals.get(0), 0, "First natural should be 0");
    test.equal(naturals.get(1), 1, "Second natural should be 1");
    test.equal(naturals.get(2), 2, "Third natural should be 2");
    test.equal(naturals.get(3), 3, "Fourth natural should be 3");
    test.equal(naturals.get(4), 4, "Fifth natural should be 4");

    test.done();
};

exports.testMap = function(test) {
    test.expect(6);

    var naturals = Stream.from(0);
    var odds = naturals.map(function(value) {
        return (value * 2) + 1;
    });
    var evens = odds.map(function(value) {
        return value + 1;
    });

    test.equal(odds.get(0), 1, "The first odd should be 1");
    test.equal(odds.get(1), 3, "The second odd should be 3");
    test.equal(odds.get(2), 5, "The third odd should be 5");

    test.equal(evens.get(0), 2, "The first even should be 2");
    test.equal(evens.get(1), 4, "The second even should be 4");
    test.equal(evens.get(2), 6, "The third even should be 6");

    test.done();
};

exports.testTake = function(test) {
    test.expect(2);

    var integers = Stream.from(1);
    var firstFiveIntegers = integers.take(5);

    test.equal(firstFiveIntegers.isFinite(), true, "Taken stream should be finite");
    test.equal(firstFiveIntegers.length(), 5, "Length of stream should equal the number of items taken");

    test.done();
};

exports.testForEach = function(test) {
    test.expect(1);

    var total = 0;
    var integers = Stream.from(1);
    var squares = integers.map(function(value) {
        return value * value;
    });

    var firstFiveSquares = squares.take(5);

    firstFiveSquares.forEach(function(x) {
        total += x;
    });

    test.equal(total, 55, "The sum of the squares of the first 5 integers should be 55");

    test.done();
};

exports.testIterate = function(test) {
    test.expect(5);

    var alternatingSignOnes = Stream.iterate(1, function(previous) {
        return -1 * previous;
    });

    test.equal(alternatingSignOnes.get(0), 1, "First item should be 1");
    test.equal(alternatingSignOnes.get(1), -1, "Second item should be -1");
    test.equal(alternatingSignOnes.get(2), 1, "Third item should be 1");
    test.equal(alternatingSignOnes.get(3), -1, "Fourth item should be -1");
    test.equal(alternatingSignOnes.get(4), 1, "Fifth item should be 1");

    test.done();
};

exports.testCons = function(test) {
    test.expect(5);

    var naturals = Stream.cons(0, Stream.from(1));

    test.equal(naturals.get(0), 0, "First natural should be 0");
    test.equal(naturals.get(1), 1, "Second natural should be 1");
    test.equal(naturals.get(2), 2, "Third natural should be 2");
    test.equal(naturals.get(3), 3, "Fourth natural should be 3");
    test.equal(naturals.get(4), 4, "Fifth natural should be 4");

    test.done();
};

exports.testTakeWhile = function(test) {
    test.expect(1);

    var first5naturals = Stream.from(0).takeWhile(function(value) {
        return value <= 4;
    });

    test.equal(first5naturals.length(), 5, "Length of naturals <= 4 should be 5");

    test.done();
};

exports.testZip = function(test) {
    test.expect(6);

    var zip = Stream.from(0).zip(Stream.from(1)).map(function(value) {
        return value[0] + value[1];
    });

    test.equal(zip.get(0), 1, "0 + 1 = 1");
    test.equal(zip.get(1), 3, "1 + 2 = 3");
    test.equal(zip.get(2), 5, "2 + 3 = 5");
    test.equal(zip.get(3), 7, "3 + 4 = 7");
    test.equal(zip.get(4), 9, "4 + 5 = 9");
    test.equal(zip.get(5), 11, "5 + 6 = 11");

    test.done();
};

exports.testSum = function(test) {
    test.expect(6);

    var s = Stream.sum(Stream.from(0), 0);

    test.equal(s.get(0), 0, "0");
    test.equal(s.get(1), 1, "0 + 1 = 1");
    test.equal(s.get(2), 3, "0 + 1 + 2 = 3");
    test.equal(s.get(3), 6, "0 + 1 + 2 + 3 = 6");
    test.equal(s.get(4), 10, "0 + 1 + 2 + 3 + 4 = 10");
    test.equal(s.get(5), 15, "0 + 1 + 2 + 3 + 4 + 5 = 15");

    test.done();
};
