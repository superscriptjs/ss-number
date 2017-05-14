
import conv from '../src/convert';
import math from '../src/expression';
import pattern from '../src/pattern';

export default{
  cardPlural: conv.cardPlural,
  convertWordToNumber: conv.convertWordToNumber,
  convertWordsToNumbers: conv.convertWordsToNumbers,
  convertNumberToWord: conv.convertNumberToWord,
  numberLookup: conv.numberLookup,
  parse: math.parse,
  next: pattern.next,
  prev: pattern.prev,
  patternType: pattern.patternType,
  missing: pattern.missing
};