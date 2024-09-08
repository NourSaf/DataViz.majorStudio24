/*
  Exercise 2
  JavaScript quirks and tricks
*/

var schoolName = "Parsons";
var schoolYear = 1936;

// Task
// What is the value of test3?
var test1;
if (1 == true) {
  test1 = true;
} else {
  test1 = false;
}

var test2;
if (1 === true) {
  test2 = true;
} else {
  test2 = false;
}

var test3 = test1 === test2;
/*
test1 = true,
test2 = false, 
therefore
test3 = false 
*/
console.log("test3 is", test3);

// Task
// Change this code so test4 is false and test5 is true. Use console.log() to confirm your cod works.
var test4 = 0 === "";
var test5 = 1 === 1;

console.log("test4 is", test4, "and test 5 is", test5);

// Task
// What are the values of p, q, and r? Research what is going on here.
var w = 0.1;
var x = 0.2;
var y = 0.4;
var z = 0.5;

var p = w + x;
console.log(w,"+",x,"=", p);

var q = z - x;
console.log(z, "-",x,"=", q);

var r = y - w;
console.log(y, "-",w,"=", r);

/*
This is a commun problem in Javascript, which is called 
floating-point arithmetic issue or decimal numbers inaccuracy issue. 
The main reason is how numbers are stoared in Javascrip, which follows 
IEEE 754 (Standard for Floating-Point Arithmetic).

It can be sloved in
different ways. 
1. Playaround: Math.round((0.1 + 0.2) * 1e12) 1e12 –> result = 0.3 
  this is shifting the decimal point to the right 12 times and then round
  the number then shift the deciaml point again to place to result with 0.3
2. In case we need a very percise solution we could use a library that solves 
   the probelm. Like JS Big Decimal library 
   https://github.com/royNiladri/js-big-decimal

the reason why 0.5 - 0.2 = 0.3 is precise is because of the binary reperesntation
of both 0.5 and 0.2 which is precise. 
See: https://learn.microsoft.com/en-us/cpp/build/ieee-floating-point-representation?view=msvc-170
*/ 
