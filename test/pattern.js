/* global describe, it */

import mocha from 'mocha';
import should from 'should/as-function';
import pattern from '../src/sequence';

describe('Number sequence detection', () => {
  it('Detect a Arithmetic pattern', (done) => {
    should(pattern.next([1,2,3,4,5])).eql(6);
    should(pattern.next([2,4,6])).eql(8);
    should(pattern.next([7,6,5,4])).eql(3);
    should(pattern.prev([2,3,4,5])).eql(1);
    done();
  });

  it('Detect a Geometric pattern', (done) => {
    should(pattern.next([1,3,9,27])).eql(81);
    should(pattern.next([27,9,3])).eql(1);
    done();
  });

  it('Detect a Square pattern', (done) => {
    should(pattern.next([0,1,4,9,16,25])).eql(36);
    should(pattern.next([0,4,16])).eql(36);
    should(pattern.next([25,16,9])).eql(4);
    done();
  });

  it('Detect a Cube pattern', (done) => {
    should(pattern.next([1,8,27,64])).eql(125);
    should(pattern.next([64,27,8])).eql(1);
    done();
  });

  it('Detect a Fibonacci pattern', (done) => {
    should(pattern.next([0,1,1,2,3,5,8])).eql(13);
    should(pattern.next([8,5,3,2])).eql(1);
    should(pattern.next([8,5,3,2,1])).eql(1);
    should(pattern.next([8,5,3,2,1,1])).eql(0);
    done();
  });
});