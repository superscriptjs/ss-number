/* global describe, it */

import mocha from 'mocha';
import should from 'should/as-function';


import math from '../src/index';
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
    // TODO.
    // should(conv.convertNumberToWord(100)).eql('one hundred');
    // should(conv.convertNumberToWord(130)).eql('one hundred and thirty');
    done();
  })

});

describe('Parse expression', () => {
  it('Simple expression 1 + 1', (done) => {
    const ans = math.parse("what is 1 + 1".split(" "));
    should(ans).equal(2);
    done();
  });

  it('Simple expression 2 (3 terms)', (done) => {
    const ans = math.parse("What is 4 + 2 - 1".split(" "));
    should(ans).equal(5);
    done();
  });

  it('Word expression', (done) => {
    const ans = math.parse("What is seven times eight".split(" "));
    should(ans).equal(56);
    done();
  });

  it('percent 1 expression', (done) => {
    const ans = math.parse("What is 50 percent of 40".split(" "));
    should(ans).equal(20);
    done();
  });

  it('percent 2 expression', (done) => {
    const ans = math.parse("What is half of six".split(" "));
    should(ans).equal(3);
    done();
  });

  it('div zero', (done) => {
    const ans = math.parse("What is 7 divided by 0".split(" "));
    should(ans).equal(null);
    done();
  });

  it('fraction', (done) => {
    const ans = math.parse("What is a third of 6".split(" "));
    should(ans).equal(2);
    done();
  });

  it('square root', (done) => {
    const ans = math.parse("What is the square root of 9".split(" "));
    should(ans).equal(3);
    done();
  });

  it('square root 2', (done) => {
    const ans = math.parse("What is the square root of 3 x 3 ".split(" "));
    should(ans).equal(3);
    done();
  });

  it('square root 3', (done) => {
    const ans = math.parse("What is the 3 x 3 squared".split(" "));
    should(ans).equal(3);
    done();
  });

});
