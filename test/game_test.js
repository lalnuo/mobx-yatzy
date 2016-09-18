import { expect } from 'chai';
import { times, map, pipe, keyBy, takeRight, newValues } from 'lodash/fp';
import {
  startGame,
  throwDices
} from '../app/logic/game';

const toArray = obsArray => [...obsArray];
describe('Game', function() {
  context('Starting a new game', function() {
    let initialState;
    before(function() {
      initialState = startGame(['Drake', 'Lalli']);
    })
    it('adds players to store', function() {
      expect(initialState.players)
        .to.deep.eq([
          { id: 0, name: 'Drake' },
          { id: 1, name: 'Lalli' }
        ]);
    });
    it('sets current player', function() {
      expect(initialState.config.currentPlayerId)
        .to.eq(0)
    });
    it('sets throws left 3', function() {
      expect(initialState.config.throwsLeft).to.eq(3);
    });
    it('creates 5 dices with value null', function() {
      const dices = initialState.config.dices;
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
    it('throws only chosen dices', function() {
      const dices = {
        0: { id: 0, value: null },
        1: { id: 1, value: null }
      }
      const newValues = throwDices(dices, [0]);

      expect(newValues[0].value).to.be.a('number');
      expect(newValues[1].value).to.be.null
    });
  });
});
