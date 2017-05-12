/* global describe, it */

import mocha from 'mocha';
import should from 'should/as-function';
import pattern from '../src/sequence';

describe('Number sequence detection', () => {
  it('Detect a Arithmetic pattern', (done) => {
    should(pattern.next([1,2,3,4,5])).eql(6);
    should(pattern.next([2,4,6])).eql(8);
    done();
  });

  it('Detect a Geometric pattern', (done) => {
    should(pattern.next([1,3,9,27])).eql(81);
    done();
  });

  it('Detect a Square pattern', (done) => {
    should(pattern.next([0, 1, 4, 9, 16, 25])).eql(36);
    should(pattern.next([0, 4, 16 ])).eql(36);
    done();
  });

  it('Detect a Cube pattern', (done) => {
    should(pattern.next([1, 8, 27, 64])).eql(125);
    done();
  });

  it('Detect a Fib pattern', (done) => {
    should(pattern.next([0, 1, 1, 2, 3, 5, 8])).eql(13);
    done();
  });
});