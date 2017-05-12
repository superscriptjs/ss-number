
const _ = require("lodash");
const debug = require("debug")("math");
const safeEval = require("safe-eval");

import conv from './convert';

const mathExpressionSubs = {
  'plus': '+',
  'minus': '-',
  'multiply': '*',
  'multiplied': '*',
  'x': '*',
  'times': '*',
  'divide': '/',
  'divided': '/'
};

// Given an array for words it returns the evauated sum.
// TODO - fractions
// TODO, words should be the dict object with lem words to fix muliply / multipled etc
const parse = function(words, prev){
  debug("In parse with", words);
  prev = prev || 0;
  let expression = [];
  let newexpression = [];
  let word;
  let square = false;

  for (let i = 0; i < words.length; i++) {
    // Convert words from word form to digit form.
    let digit = conv.convertWordToNumber(words[i]);
    if (digit !== undefined) {
      words[i] = digit;
    }

    word = words[i];
    // Convert word expression to evaluated equivilant.
    if (mathExpressionSubs[word] !== undefined){
      words[i] = mathExpressionSubs[word];
    }
  }

  // Special case - square root
  if (_.includes(words, "square") || _.includes(words, "squared")){
    words = _.reject(words, function(w){ 
      return ["squared","square","root","of"].indexOf(w) !== -1;
    });
    square = true;
  }

  for (let i = 0; i < words.length; i++){
    word = words[i];
    if (/[\d\*\+\-\/=%]|of|half|third|percent/.test(word)){
      if (word == "half") {
        newexpression.push(0.5);
      } else if (word == "third"){
       newexpression.push(.333333);
      } else if (word == "of") {
        expression.push("*");
      } else if ((word == "%" || word == "percent" ) && isNumeric(words[i - 1])){
        expression.pop();
        expression.push(parseInt(words[i - 1]) / 100);
      } else {
        expression.push(word);
      }
    }
  }

  // Make numbers positive
  for (let i = 0; i < expression.length; i++){
    let curr = expression[i];
    let next = expression[i + 1];
    newexpression.push(curr);
    if (/\d/.test(curr) && /\d/.test(next)){
      newexpression.push("+");
    }
  }

  try {
    if (newexpression.length == 2 || newexpression[0] == "+"){
      newexpression.unshift(prev);
    }
    debug("Eval", newexpression.join(" "));
    let value = safeEval(newexpression.join(" "));

    if (square) {
      value = safeEval("Math.sqrt(" + value + ");");
    }

    return _.isFinite(value) ? +value.toFixed(2) : null;
  } catch (e) {
    debug("Error", e);
    return null;
  }
};

const isNumeric = function(num){
  return !isNaN(num);
};

export default{
  parse
};