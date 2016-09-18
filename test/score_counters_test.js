import { expect } from 'chai';
import {
  sameNumberCounter,
  groupCounter,
  smallStraightCounter,
  largeStraightCounter,
  fullHouseCounter,
  changeCounter,
  yatzyCounter,
  twoPairsCounter
} from '../app/score_counters';

describe('validators', function() {
  context('sameNumberCounter', function() {
    it('counts sum of desired number', function() {
      expect(sameNumberCounter([1, 2, 2, 4], 2))
        .to.eq(4);
    });
  });
  context('groupCounter', function() {
    it('returns 0 if there are no groups big enough', function() {
      expect(groupCounter([2, 2, 3, 4, 5, 6], 3))
        .to.eq(0);
    });
    it('returns sum of the biggest group with group size 2', function() {
      expect(groupCounter([6, 4, 3, 2, 6, 2], 2))
        .to.eq(12);
    });
    it('returns sum of the biggest group with group size 3', function() {
      expect(groupCounter([1, 1, 1, 5, 5, 5], 3))
        .to.eq(15);
    });
  });
  context('Two pairs counter', function() {
    it('Returns sum of two pairs', function() {
      expect(twoPairsCounter([1, 2, 1, 2, 5]))
        .to.eq(1 + 1 + 2 +2);
    });
    it('Returns 0 with invalid two pairs', function() {
      expect(twoPairsCounter([1, 1, 3, 4, 5, 6]))
        .to.eq(0);
    })
  });
  context('Small straight counter', function() {
    it('returns 15 for small straight', function() {
      expect(smallStraightCounter([1, 2, 3, 4, 5]))
        .to.eq(15);
    });
    it('returns 0 for not valid small straight', function() {
      expect(smallStraightCounter([1, 2, 3, 4, 4]))
        .to.eq(0);
    });
  });
  context('Large straight counter', function() {
    it('returns 20 for large straight', function() {
      expect(largeStraightCounter([2, 3, 4, 5, 6]))
        .to.eq(20);
    });
    it('returns 0 for not valid large straight', function() {
      expect(largeStraightCounter([1, 2, 3, 4, 4]))
        .to.eq(0);
    });
  });
  context('Full house counter', function() {
    it('returns sum of numbers with valid full house', function() {
      expect(fullHouseCounter([2, 3, 2, 3, 3]))
        .to.eq(13);
    });
    it('returns zero with invalid full house', function() {
      expect(fullHouseCounter([1, 2, 3, 4, 5, 6]))
        .to.eq(0);
    })
  });
  context('Change', function() {
    it('returns sum of the numbers', function() {
      expect(changeCounter([3, 4, 5, 6, 7]))
        .to.eq(3 + 4 + 5 + 6 + 7);
    });
  })
  context('Yatzy', function() {
    it('returns 50 if all numbers are same', function() {
      expect(yatzyCounter([1, 1, 1, 1, 1]))
        .to.eq(50);
    });
    it('returns 0 if all numbers are not same', function() {
      expect(yatzyCounter([1, 1, 1, 1, 5]))
        .to.eq(0);
    });
  })
})
