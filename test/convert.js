/* global describe, it */

import mocha from 'mocha';
import should from 'should/as-function';
import conv from '../src/convert';

describe('Convert', () => {
  it('convert word to number', (done) => {
    should(conv.convertWordToNumber("one")).eql(1); // cardinalNumbers case
    should(conv.convertWordToNumber("bad")).eql("bad"); // cardinalNumbers case
    should(conv.convertWordToNumber("twenty-two")).eql(22); // hyphenated case
    done();
  });

  it('convert words to numbers (array)', (done) => {
    should(conv.convertWordsToNumbers(["one"])).eql([1]);
    should(conv.convertWordsToNumbers(["twenty-two"])).eql([22]);
    should(conv.convertWordsToNumbers(["one", "hundred"])).eql([100]);
    should(conv.convertWordsToNumbers(["one", "hundred", "and", "fifty"])).eql([150]);
    should(conv.convertWordsToNumbers(["one", "hundred", "fifty"])).eql([150]);
    should(conv.convertWordsToNumbers(["one", "hundred", "fifty", "thousand"])).eql([150000]);
    should(conv.convertWordsToNumbers(["one", "hundred", "fifty", "thousand", "twenty-three"])).eql([150023]);
    should(conv.convertWordsToNumbers(["one", "hundred", "fifty", "three", "thousand", "three", "hundred", "twenty", "one"])).eql([153321]);
    should(conv.convertWordsToNumbers(["three", "hundred", "thousand", "three", "hundred", "twenty", "one"])).eql([300321]);
    should(conv.convertWordsToNumbers(["nine", "hundred", "ninety", "nine", "thousand", "nine", "hundred", "ninety-nine"])).eql([999999]);
    done();
  })

  it('convert numbers to words', (done) => {

    should(conv.convertNumberToWord(1)).eql('one');
    should(conv.convertNumberToWord(22)).eql('twenty-two');
    should(conv.convertNumberToWord(22.67)).eql('twenty-two point sixty-seven');

    should(conv.convertNumberToWord(0)).eql('zero');
    should(conv.convertNumberToWord(-5)).eql('negative five');
    should(conv.convertNumberToWord(-10)).eql('negative ten');
    should(conv.convertNumberToWord(5)).eql('five');
    should(conv.convertNumberToWord(12)).eql('twelve');

    should(conv.convertNumberToWord(101)).eql('one hundred and one');
    should(conv.convertNumberToWord(1001)).eql('one thousand and one');
    should(conv.convertNumberToWord(1111)).eql('one thousand and one hundred and eleven');
    should(conv.convertNumberToWord(11035)).eql('eleven thousand and thirty-five');
    should(conv.convertNumberToWord(111035)).eql('one hundred and eleven thousand and thirty-five');
    done();
  })

});
