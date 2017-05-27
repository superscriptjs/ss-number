
import conv from './convert';
import math from './expression';
import pattern from './pattern';

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