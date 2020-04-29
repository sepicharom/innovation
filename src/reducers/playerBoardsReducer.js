/**
 * @module  src/reducers/playerBoardsReducer
 * @author  samanthasalley
 * @description handle state updates for cards on player boards. 
 *  split from players to enable slightly flatter state structure.
 *    @example structure of a color:
 *      blue: {
 *        exampleUsername: ['Bottom Card', 'Middle Card', 'Top Card'],
 *        ...more players blue hands
 *      },
 *      ...more card colors
 * @exports playerBoardsReducer
 */

import produce from 'immer';
import actions from '../actions/actionTypes';

const initialState = {
  blue: {},
  green: {},
  red: {},
  yellow: {},
  purple: {},
};

/**
 * @function playerBoardsReducer
 * @param {string} type - dictates which elements of state change
 * @param {any} payload - value to apply to change state
 * @returns updated state
 */
// The immer library allows us to mutate a temporary draft version of the state
// Once our mutations are complete, immer will produce the new state based on the changes
// There's no need for a default case, since immer will return the state unchanged if there 
// are no mutations
const playerBoardsReducer = produce((draft, { type, payload }) => {
  switch (type) {
    case actions.SIMPLE_ACTION:
      break;
    default:
      return draft;
  }
}, initialState); // initialize state

export default playerBoardsReducer;