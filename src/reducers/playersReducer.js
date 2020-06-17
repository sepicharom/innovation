/**
 * @module  src/reducers/playersReducer
 * @author  samanthasalley
 * @description handle state updates for players.
 *    (eg. username, achievements, etc.)
 * @exports playersReducer
 */

import produce from 'immer';
import actions from '../actions/actionTypes';

const initialState = {
  usernames: [],
  playersByUsername: {},
  currentPlayer: '',
  actionNumber: 1,
};

/**
 * @function playersReducer
 * @param {string} type - dictates which elements of state change
 * @param {any} payload - value to apply to change state
 * @returns updated state
 */
// The immer library allows us to mutate a temporary draft version of the state
// Once our mutations are complete, immer will produce the new state based on the changes
// There's no need for a default case, since immer will return the state unchanged if there
// are no mutations
const playersReducer = produce((draft, { type, payload }) => {
  switch (type) {
    case actions.SET_PLAYERS:
      draft.usernames = Object.keys(payload.players);
      draft.playersByUsername = payload.players;
      draft.currentPlayer = draft.usernames[0];
      break;
    case actions.UPDATE_CURRENT_PLAYER:
      draft.currentPlayer = payload.username;
      break;
    case actions.PLAYER_ACTION_OCCURRED:
      if (draft.actionNumber === 2) {
        const curPlayerIdx = draft.usernames.indexOf(draft.currentPlayer);
        const nextPlayerIdx =
          curPlayerIdx === draft.usernames.length - 1 ? 0 : curPlayerIdx + 1;
        draft.actionNumber = 1;
        draft.currentPlayer = draft.usernames[nextPlayerIdx];
      } else draft.actionNumber = 2;
      break;
    default:
      return draft;
  }
}, initialState); // initialize state

export default playersReducer;
