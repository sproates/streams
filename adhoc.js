var Stream = require('./stream.js');

var naturals = Stream.from(0);

var integers = Stream.from(1);

var squares = integers.map(function(value) {
    return value * value;
});

var odds = naturals.map(function(value) {
    return (value * 2) + 1;
});
var evens = odds.map(function(value) {
    return value + 1;
});
var oddInverses = odds.map(function(value) {
    return 1 / value;
});
var evenInverses = evens.map(function(value) {
    return 1 / value;
});

var odds2 = Stream.from(1, 2);

console.log('Odds: \n\n');

console.log(odds.get(0));
console.log(odds.get(1));
console.log(odds.get(2));

console.log('\n\nEvens:\n\n');

console.log(evens.get(0));
console.log(evens.get(1));
console.log(evens.get(2));

console.log('\n\nOdd inverses:\n\n');

console.log(oddInverses.get(0));
console.log(oddInverses.get(1));
console.log(oddInverses.get(2));

console.log('\n\nEven inverses\n\n');

console.log(evenInverses.get(0));
console.log(evenInverses.get(1));
console.log(evenInverses.get(2));

console.log('\n\nOdds (using from):\n\n');

console.log(odds2.get(0));
console.log(odds2.get(1));
console.log(odds2.get(2));

/*
odds.forEach(function(x) {
    console.log(x);
});
*/

console.log('\n\nFirst 5 integers\n\n');

var first5Integers = integers.take(5);
console.log(first5Integers);

console.log(first5Integers.get(0));
console.log(first5Integers.get(1));
console.log(first5Integers.get(2));
console.log(first5Integers.get(3));
console.log(first5Integers.get(4));
//console.log(first5Integers.get(5));

console.log(first5Integers.length());

console.log('\n\nIterate\n\n');

var alternatingSignOnes = Stream.iterate(1, function(previous) {
    return -1 * previous;
});

console.log(alternatingSignOnes.get(0));
console.log(alternatingSignOnes.get(1));
console.log(alternatingSignOnes.get(2));
console.log(alternatingSignOnes.get(3));
console.log(alternatingSignOnes.get(4));
console.log(alternatingSignOnes.get(5));
console.log(alternatingSignOnes.get(6));

console.log('\n\nCons\n\n');

var consNaturals = Stream.cons(0, Stream.from(1));

console.log(consNaturals);
console.log(consNaturals.get(0));
console.log(consNaturals.get(1));
console.log(consNaturals.get(2));
console.log(consNaturals.get(3));
console.log(consNaturals.get(4));

console.log('\n\nTake while\n\n');

var naturals = Stream.from(0);

var first5naturals = naturals.takeWhile(function(value) {
    return value <= 4;
});

console.log(first5naturals);
console.log(first5naturals.length());

console.log(first5naturals.get(0));
console.log(first5naturals.get(1));
console.log(first5naturals.get(2));
console.log(first5naturals.get(3));
console.log(first5naturals.get(4));
//console.log(first5naturals.get(5));
//console.log(first5naturals.get(6));

console.log('\n\nZip\n\n');

var zip1 = Stream.from(0).zip(Stream.from(1)).map(function(value) {
    return value[0] + value[1];
});

console.log(zip1.get(0));
console.log(zip1.get(1));
console.log(zip1.get(2));
console.log(zip1.get(3));

console.log('\n\nSum\n\n');

var s = Stream.sum(Stream.from(1), 0);

console.log(s.get(0));
console.log(s.get(1));
console.log(s.get(2));
console.log(s.get(3));
console.log(s.get(4));

/*
var x = integers.take(5);

x.forEach(function(n) {
    console.log(n);
});
*/

//console.log(odds2.get(5));

/*
console.log(integers.get(0));
console.log(integers.get(1));
console.log(integers.get(2));
console.log(integers.get(3));


console.log(squares.get(0));
console.log(squares.get(1));
console.log(squares.get(2));
console.log(squares.get(3));

*/

console.log('\n\npi approximations\n\n');

var oddInverses = Stream.from(1, 2).map(function(value) {
    return 1 / value;
});
var alternatingSignOnes = Stream.iterate(1, function(previous) {
    return -1 * previous;
});
var gregoryLeibnizProducts = oddInverses.zip(alternatingSignOnes).map(function(value) {
    return value[0] * value[1];
});

console.log(gregoryLeibnizProducts.get(0));
console.log(gregoryLeibnizProducts.get(1));
console.log(gregoryLeibnizProducts.get(2));
console.log(gregoryLeibnizProducts.get(3));
console.log(gregoryLeibnizProducts.get(4));

var piApprox = gregoryLeibnizProducts.sumTerms(4);

console.log(piApprox.get(10000));

