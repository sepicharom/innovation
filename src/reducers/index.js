/**
 * @module  src/reducers/index
 * @author  samanthasalley
 * @description combine all reducers into rootReducer and make it available for the redux store
 * @exports rootReducer
 */

import { combineReducers } from 'redux';

// import all reducers
import deckReducer from './deckReducer';
import cardsReducer from './cardsReducer';
import playersReducer from './playersReducer';
import achievementsReducer from './achievementsReducer';
import playerBoardsReducer from './playerBoardsReducer';

// combine reducers and export
export default combineReducers({
  deck: deckReducer,
  cards: cardsReducer,
  players: playersReducer,
  boards: playerBoardsReducer,
  achievements: achievementsReducer,
});