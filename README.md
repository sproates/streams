Usage
-----

    // Get the lib
    var Stream = require('./stream.js');

    // 0, 1, 2, ...
    var naturals = Stream.from(0);

    // 1, 2, 3, ...
    var positiveIntegers = Stream.from(1);

    // 1, 4, 9, ...
    var squares = positiveIntegers.map(function(x) {
        return x * x;
    });

    // 1, 3, 5, ...
    var odds = naturals.map(function(x) {
        return (x * 2) + 1;
    });

    // 2, 4, 6, ...
    var evens = odds.map(function(value) {
        return value + 1;
    });

    // 1/1, 1/3, 1/4, ...
    var oddInverses = odds.map(function(value) {
        return 1 / value;
    });

    // 1/2, 1/4, 1/6, ...
    var evenInverses = evens.map(function(value) {
        return 1 / value;
    });

    // 1, 3, 5, ...
    var oddsFrom = Stream.from(1, 2);

    // 1, 2, 3, 4, 5
    var firstIntegers = positiveIntegers.take(5);

    // 0, 1, 2, 3, 4
    var firstNaturals = naturals.takeWhile(function(x) {
        return x < 5;
    });

    // 1
    var x = firstIntegers.get(0);

    // 3
    var y = firstIntegers.get(2);

    // 1, -1, 1, -1, 1, ...
    var alternatingSignOnes = Stream.iterate(1, function(x) {
        return -1 * x;
    });

    // 0, 1, 2, ...
    var consedNaturals = Stream.cons(0, Stream.from(1));

    // 1, 3, 5, ...
    var zippedOdds = Stream.from(0).zip(Stream.from(1)).map(function(x) {
        return x[0] + x[1];
    });

    // 0, 1, 3, 6, 10, 15, ...
    var triangulars = Stream.sum(Stream.from(1), 0);

    // 1, -1/3, 1/5, -1/7, 1/9, ...
    var gregoryLeibnizProducts = oddInverses.zip(alternatingSignOnes).map(function(x) {
        return x[0] * x[1];
    });

    // Σ(gregoryLeibnizProducts) ~= π/4
    var piApprox = gregoryLeibnizProducts.sumTerms(4);

    // 3.1416926435905346
    var p = piApprox.get(10000);
