/* global describe, it */

import mocha from 'mocha';
import should from 'should/as-function';
import math from '../src/expression';

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

  it('fraction', (done) => {
    const ans = math.parse("What is a 3 rd of 6".split(" "));
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
