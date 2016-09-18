import store from './store';

export const initializeGame = ({ gameState, players }) => {
  store.set('gameState', gameState);
  store.set('players', players);
};
