import { times, random } from 'lodash' // TODO: Use only lodash/fp
import { includes, keyBy, pipe, take, map } from 'lodash/fp';

export const startGame = names => {
  const players = names.map((name, id) => ({ name, id }));
  const config = { currentPlayerId: 0, throwsLeft: 3, dices: initializeDices() };
  return { players, config };
};

const initializeDices = () => {
  return pipe(map(id => ({ id, value: null})), keyBy('id'))(times(5));
}

export const throwDices = (dices, updateIds) => {
  const newDices = pipe(map(id => ({ id, value: random(6) + 1 })), keyBy('id'))(updateIds);
  return { ...dices, ...newDices };
};
