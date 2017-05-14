# Number library for SuperScript.

## To Install.
`npm install ss-number --save`

This Library is broken into 3 parts for solving simple number type problems.


## Pattern Solving
Pattern solving in number arrays. Supports Arithmetic, Geometric, Square, Cube and Fibonacci Patterns.
```
pattern.patternType([1,2,3,4,5]); // 'Arithmetic';
pattern.next([1,2,3,4,5]); // 6
pattern.prev([1,2,3,4,5]); // 0
pattern.missing([1,2,undefined,4,5]); // { number: 3, type: 'Arithmetic', set: [ 1, 2, 3, 4, 5 ] }
```

## Converting words to numbers and back

```
conv.convertWordToNumber("twenty-two"); // 22
conv.convertWordsToNumbers(["one", "hundred", "and", "fifty"]); // [150]
conv.convertNumberToWord(111035); // 'one hundred and eleven thousand and thirty-five'
```

## Evaluating expressions

This will parse a tokenized string and try to resolve the expression.
It is able to convert expression words to numeric form and disregard extra unknown tokens.
Supports simple fractions and square root

```
math.parse("what is 1 + 1".split(" ")); // 2
math.parse("What is seven times eight".split(" ")); // 56
math.parse("What is a third of 6".split(" ")); // 2
math.parse("What is the square root of 3 x 3 ".split(" ")); // 3
```
