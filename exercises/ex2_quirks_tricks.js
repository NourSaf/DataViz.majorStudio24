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
