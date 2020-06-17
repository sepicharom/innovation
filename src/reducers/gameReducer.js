/**
 * @module  src/reducers/gameReducer
 * @author  samanthasalley
 * @description handle state updates for a game.
 * @exports gameReducer
 */

import produce from 'immer';
import actions from '../actions/actionTypes';

const initialState = {
  gameId: null,
  gameReady: false,
  handsByUsername: {},
  boardsByUsername: {},
};

/**
 * @function gameReducer
 * @param {string} type - dictates which elements of state change
 * @param {any} payload - value to apply to change state
 * @returns updated state
 */
// The immer library allows us to mutate a temporary draft version of the state
// Once our mutations are complete, immer will produce the new state based on the changes
// There's no need for a default case, since immer will return the state unchanged if there
// are no mutations
const gameReducer = produce((draft, { type, payload }) => {
  switch (type) {
    case actions.START_GAME:
      draft.gameReady = true;
      draft.gameId = payload.gameId;
      Object.keys(payload.hands).forEach((username) => {
        draft.handsByUsername[username] = payload.hands[username];
      });
      break;
    case actions.SET_GAME_READY:
      draft.gameReady = true;
      break;
    case actions.SET_GAME_ID:
      draft.gameId = payload.gameId;
      break;
    case actions.SET_BOARDS:
      Object.keys(payload.boardsByUsername).forEach((username) => {
        draft.boardsByUsername[username] = payload.boardsByUsername[username];
      });
      break;
    case actions.UPDATE_PLAYER_BOARD:
      draft.boardsByUsername[payload.username] = payload.newBoard;
      break;
    case actions.SET_HANDS:
      Object.keys(payload.handsByUsername).forEach((username) => {
        draft.handsByUsername[username] = payload.handsByUsername[username];
      });
      break;
    case actions.UPDATE_PLAYER_HAND:
      draft.handsByUsername[payload.username] = payload.newHand;
      break;
    case actions.MELD_CARD:
      draft.boardsByUsername[payload.username][payload.color].push(
        payload.card
      );
      break;
    default:
      return draft;
  }
}, initialState); // initialize state

export default gameReducer;
