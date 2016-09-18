import filter from 'lodash/fp/filter';
import sum from 'lodash/fp/sum';
import keys from 'lodash/fp/keys';
import max from 'lodash/fp/max';
import sortBy from 'lodash/fp/sortBy';
import pipe from 'lodash/fp/pipe';
import take from 'lodash/fp/take';
import takeRight from 'lodash/fp/takeRight';
import isEqual from 'lodash/fp/isEqual';
import groupBy from 'lodash/fp/groupBy';

// Helpers
export const allAreSame = (numbers) => {
    return numbers.every(i => i === numbers[0]);
};

const sortedArrayMatches = (numbers, compareTo) => {
  return pipe(sortBy(i => i), isEqual(compareTo))(numbers);
};

export const groupCounter = (numbers, groupSize) => {
  const greatestGroup = pipe(sortBy(i => i), takeRight(groupSize))(numbers);
  return allAreSame(greatestGroup) ? sum(greatestGroup) : 0;
};

// Actual counters
export const sameNumberCounter = (numbers, number) => {
  return pipe(filter(i => i === number), sum)(numbers);
};

export const pairCounter = numbers => {
  return groupCounter(numbers, 2);
};

export const twoPairsCounter = numbers => {
  const pairs = pipe(sortBy(i => i), take(4))(numbers);
  const firstPair = pipe(take(2), allAreSame)(pairs);
  const secondPair = pipe(takeRight(2), allAreSame)(pairs);
  const isValidTwoPairs = firstPair && secondPair;

  return isValidTwoPairs ? sum(pairs) : 0;
};

export const threeOfAKindCounter = numbers => {
  return groupCounter(numbers, 3);
};

export const fourOfAKindCounter = numbers => {
  return groupCounter(numbers, 4);
};

export const smallStraightCounter = numbers => {
  return sortedArrayMatches(numbers, [1, 2, 3, 4, 5]) ? 15 : 0;
};

export const largeStraightCounter = numbers => {
  return sortedArrayMatches(numbers, [2, 3, 4, 5, 6]) ? 20 : 0;
};

export const fullHouseCounter = numbers => {
  const sorted = sortBy(i => i, numbers);
  const pair = pipe(take(2), allAreSame)(sorted);
  const threeOfKind = pipe(takeRight(3), allAreSame)(sorted);
  const isFullHouse = pair && threeOfKind;

  return isFullHouse ? sum(numbers) : 0
};

export const changeCounter = numbers => {
  return sum(numbers)
};

export const yatzyCounter = numbers => {
  return allAreSame(numbers) ? 50 : 0;
};
