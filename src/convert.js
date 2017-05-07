const _ = require("lodash");

const cardinalNumberPlural = {
  "first": 1,
  "second": 2,
  "third": 3,
  "fourth": 4,
  "fifth": 5,
  "sixth": 6,
  "seventh": 7,
  "eigth": 8,
  "ninth": 9,
  "tenth": 10,
  "eleventh": 11,
  "twelfth ": 12,
  "thirteenth": 13,
  "fourteenth" : 14,
  "fifteenth": 15,
  "sixteenth": 16,
  "seventeenth": 17,
  "eighteenth": 18,
  "nineteenth": 19,
  "twentieth": 20,
  "twenty-first": 21,
  "twenty-second": 22,
  "twenty-third": 23,
  "twenty-fourth": 24,
  "twenty-fifth": 25,
  "twenty-sixth": 26
};

const cardinalNumbers = {
  "one": 1,
  "two": 2,
  "three": 3,
  "four": 4,
  "five": 5,
  "six": 6,
  "seven": 7,
  "eight": 8,
  "nine": 9,
  "ten": 10,
  "eleven": 11,
  "twelve": 12,
  "thirteen": 13,
  "fourteen": 14,
  "fifteen": 15,
  "sixteen": 16,
  "seventeen": 17,
  "eighteen": 18,
  "nineteen": 19,
  "twenty": 20,
  "thirty": 30,
  "forty": 40,
  "fifty": 50,
  "sixty": 60,
  "seventy": 70,
  "eighty": 80,
  "ninety": 90
};

const multiplesOfTen = {
  "twenty": 20,
  "thirty": 30,
  "forty": 40,
  "fifty": 50,
  "sixty": 60,
  "seventy": 70,
  "eighty": 80,
  "ninety": 90
};


// Given an array of words, lets convert them to numbers
// We want to subsitute one - one thousand to numberic form
// `one hundred` => 100, `one hundred and fifty` => 150
// TODO handle "two-hundred" hypenated hundred/thousand
const convertWordsToNumbers = function(wordArray){

  let mult = {hundred: 100, thousand: 1000};
  let results = [];
  let mc = 2;

  for (let i = 0; i < wordArray.length; i++){
    // Lets look ahead FIRST
    if (Object.keys(mult).indexOf(wordArray[i+1]) !== -1){
      if (mc !== 0) {
        results = results.map(function(x){ return x * mult[wordArray[i+1]];});  
      }
      
      let value = convertWordToNumber(wordArray[i]) * mult[wordArray[i+1]];
      if (!isNaN(value)) {
        results.push(value);        
      }
    } else if (Object.keys(mult).indexOf(wordArray[i]) !== -1){
      // If this word is 100, 1000, etc lets skip over it.
      if (wordArray[i] === "thousand") {
        mc = 0;  
      }
    } else {
      results.push(convertWordToNumber(wordArray[i]));
    }
  }

  // Lets just add everything together
  let value = _.reduce(results, function(a, b){ 
    return (isNumeric(a) && isNumeric(b)) ? a + b : a;
  });

  return [value];
};

const convertWordToNumber = function(word){
  if (word === undefined) return;
  if (word.indexOf("-") !== -1){
    // Handly Hyphenated numbers `seventy-six`
    let multipleOfTen = word.split("-")[0];
    let cardinalNumber = word.split("-")[1];
    if (multipleOfTen !== "" && cardinalNumber !== ""){
      let total_number = multiplesOfTen[multipleOfTen] + cardinalNumbers[cardinalNumber];
      return (!isNaN(total_number)) ? +total_number : word;
    } else {
      return word;
    }
  } else {
    return (_.includes(Object.keys(cardinalNumbers), word)) 
      ? cardinalNumbers[word]
      : word;
  }
};

const numberLookup = function(number){
  let multipleOfTen;
  let word;

  if (number < 20) {
    for (let cardinalNumber in cardinalNumbers){
      if (number == cardinalNumbers[cardinalNumber]){
        word = cardinalNumber;
        break;
      }
    }
  } else if (number < 100){
    if (number % 10 === 0){ // If the number is a multiple of ten
      for (multipleOfTen in multiplesOfTen){
        if (number == multiplesOfTen[multipleOfTen]){
          word = multipleOfTen;
          break;
        }
      }
    } else { // not a multiple of ten
      for (multipleOfTen in multiplesOfTen){
        for (let i = 9; i > 0; i--){
          if (number == multiplesOfTen[multipleOfTen] + i){
            word = multipleOfTen + "-" + convertNumberToWord(i);
            break;
          }
        }
      }
    }
  } else {
    // TODO -
    console.log("We don't handle numbers greater than 99 yet.");
  }

  return word;
}

const convertNumberToWord = function(number){
  var word = ""; // this is where we will store the result

  if (number === 0){
    return "zero";
  }

  if (number < 0){
    return "negative " + numberLookup(Math.abs(number));
  } else {
    return numberLookup(number);
  }
}

const cardPlural = function(wordNumber){
  return cardinalNumberPlural[wordNumber];
};

const isNumeric = function(num){
  return !isNaN(num);
};

export default{
  cardPlural,
  convertWordToNumber,
  convertWordsToNumbers,
  convertNumberToWord,
  numberLookup,
};