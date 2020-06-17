/**
 * @module  src/reducers/deckReducer
 * @author  samanthasalley
 * @description handle state updates for deck. 
 *    (eg. drawing and/or returning cards)
 * @exports deckReducer
 */

import produce from 'immer';
import actions from '../actions/actionTypes';

const initialState = {
  1: [],
  2: [],
  3: [],
  4: [],
  5: [],
  6: [],
  7: [],
  8: [],
  9: [],
  10: [],
};

/**
 * @function deckReducer
 * @param {string} type - dictates which elements of state change
 * @param {any} payload - value to apply to change state
 * @returns updated state
 */
// The immer library allows us to mutate a temporary draft version of the state
// Once our mutations are complete, immer will produce the new state based on the changes
// There's no need for a default case, since immer will return the state unchanged if there 
// are no mutations
const deckReducer = produce((draft, { type, payload }) => {
  switch (type) {
    case actions.START_GAME:
    case actions.SET_DECK:
      Object.keys(payload.deck).forEach(age => {
        draft[age] = payload.deck[age];
      });
      break;
    case actions.DRAW_CARD:
      draft[payload.age].pop();
      break;
    case actions.RETURN_CARD:
      draft[payload.age].unshift(payload.card);
      break;
    default:
      return draft;
  }
}, initialState); // initialize state

export default deckReducer;