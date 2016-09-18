import store from './store/store';
import map from 'lodash/fp/map';
import take from 'lodash/fp/take';
import random from 'lodash/random'
import pipe from 'lodash/fp/pipe';
import includes from 'lodash/fp/includes';
import times from 'lodash/times';
import keyBy from 'lodash/fp/keyBy';

export const startGame = names => {
  // TODO: Execute in one transaction
  names.forEach((name, id) => {
    store('players').push({ name, id });
  });
  store('gameState').set('currentPlayerId', 0);
  store('gameState').set('throwsLeft', 3);
  store('gameState').set('dices', initializeDices());
};

const initializeDices = () => {
  return pipe(map(id => ({ id, value: null})), keyBy('id'))(times(5))
}

export const throwDices = ids => {
  const throwsLeft = store('gameState').get('throwsLeft');
  if (throwsLeft === 0) return;

  const dices = store('gameState').get('dices');
  ids.forEach(id => dices[id] = { id, value: random(6) + 1 });
  store('gameState').set('throwsLeft', throwsLeft - 1);
};
