import { expect } from 'chai';
import store from '../app/store/store';
import { initializeGame } from '../app/store/store_dao';

const toArray = mobxArray => [...mobxArray];
describe('StoreDAO', function() {
  it('Initialize game sets players and the game state', function() {
    initializeGame({
      players: ['Hey', 'Ho'],
      gameState: { hey: 'ho' }
    });

    expect(store('players', toArray))
      .to.deep.eq(['Hey', 'Ho']);
  });

  it('')
})
