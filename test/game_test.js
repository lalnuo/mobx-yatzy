import { expect } from 'chai';
import {
  startGame,
  throwDices
} from '../app/game'
import map from 'lodash/fp/map';
import get from 'lodash/fp/get';
import takeRight from 'lodash/fp/takeRight'
import take from 'lodash/fp/take'
import store from '../app/store/store'

const toArray = obsArray => [...obsArray];
describe('Game', function() {
  context('Starting a new game', function() {
    before(function() {
      startGame(['Drake', 'Lalli']);
    })
    it('adds players to store', function() {
      expect(store('players', map('name')))
        .to.deep.eq(['Drake', 'Lalli']);
    });
    it('sets current player', function() {
      expect(store('gameState').get('currentPlayerId')).to.eq(0);
    });
    it('sets throws left 3', function() {
      expect(store('gameState').get('throwsLeft')).to.eq(3);
    });
    it('creates 5 dices with value null', function() {
      const dices = store('gameState', [get('dices')]);
      expect(dices)
        .to.deep.eq({
          0: { id: 0, value: null },
          1: { id: 1, value: null },
          2: { id: 2, value: null },
          3: { id: 3, value: null },
          4: { id: 4, value: null },
        });
    });
  });
  context('Throwing', function() {
    before(function() {
      startGame(['Drake', 'Lalli']);
    });

    it('throws only chosen dices', function() {
      throwDices([0, 1]);
      const diceValues = store('gameState', [get('dices'), map('value')]);

      expect(takeRight(3, diceValues)).to.deep.eq([null, null, null]);
      expect(diceValues[0]).to.be.a('number');
      expect(diceValues[1]).to.be.a('number');
    });

    it('reduces throwsLeft', function() {
      expect(store('gameState', get('throwsLeft'))).to.eq(2);
    });

    it('does not do anything if there are no throws left', function() {
      store('gameState').set('throwsLeft', 0);
      const dices = [
        { id: 0, value: 1 },
        { id: 1, value: 2 }
      ];
      store('gameState').set('dices', dices);
      throwDices([0, 1]);
      expect(store('gameState', [get('dices'), toArray]))
        .to.deep.eq(dices);
    });
  });
});
