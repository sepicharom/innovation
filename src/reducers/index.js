/**
 * @module  src/reducers/index
 * @author  samanthasalley
 * @description combine all reducers into rootReducer and make it available for the redux store
 * @exports rootReducer
 */

import { combineReducers } from 'redux';

// import all reducers
import deckReducer from './deckReducer';
import gameReducer from './gameReducer';
import cardsReducer from './cardsReducer';
import playersReducer from './playersReducer';
import achievementsReducer from './achievementsReducer';

// combine reducers and export
export default combineReducers({
  deck: deckReducer,
  game: gameReducer,
  cards: cardsReducer,
  players: playersReducer,
  achievements: achievementsReducer,
});