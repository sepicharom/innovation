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
  gameReady: false,
  usernames: ['pimone', 'tumbaa'],
  playersByUsername: {},
  handsByUsername: {},
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
    case actions.SET_GAME_READY:
      draft.gameReady = true;
      break;
    case actions.SET_PLAYERS:
      payload.players.forEach(player => {
        draft.usernames.push(player.username);
        draft.playersByUsername[player.username] = player;
      });
      break;
    case actions.SET_HANDS:
      Object.keys(payload.handsByUsername).forEach(username => {
        draft.handsByUsername[username] = payload.handsByUsername[username];
      });
      break;
    case actions.UPDATE_PLAYER_HAND:
      draft.handsByUsername[payload.username] = payload.newHand;
      break;
    default:
      return draft;
  }
}, initialState); // initialize state

export default playersReducer;