/**
 * @module  src/reducers/achievementsReducer
 * @author  samanthasalley
 * @description handle state updates for achievements.
 * (eg. setting achievement cards, 
 *      noting whether an achievement has been claimed, etc.)
 * @exports achievementsReducer
 */

import produce from 'immer';
import actions from '../actions/actionTypes';

const initialState = {
  ageAchievements: {
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
    8: null,
    9: null,
  },
  specialAchievements: {
    Monument: true,
    Empire: true,
    World: true,
    Wonder: true,
    Universe: true,
  },
  costMap: {
    1: 5,
    2: 10,
    3: 15,
    4: 20,
    5: 25,
    6: 30,
    7: 35,
    8: 40,
    9: 45,
  },
};

/**
 * @function achievementsReducer
 * @param {string} type - dictates which elements of state change
 * @param {any} payload - value to apply to change state
 * @returns updated state
 */
// The immer library allows us to mutate a temporary draft version of the state
// Once our mutations are complete, immer will produce the new state based on the changes
// There's no need for a default case, since immer will return the state unchanged if there 
// are no mutations
const achievementsReducer = produce((draft, { type, payload }) => {
  switch (type) {
    case actions.SET_ACHIEVEMENTS:
      Object.keys(payload.achievementsByAge).forEach(age => {
        draft.ageAchievements[age] = payload.achievementsByAge[age];
      });
      break;
    case actions.CLAIM_ACHIEVEMENT:
      // when somone claims an achievement, 
      // set value to false since it is no longer available
      if (payload.isSpecial) {
        draft.specialAchievements[payload.achievement] = false;
      }
      else {
        draft.ageAchievements[payload.achievement] = false;
      }
      break;
    default:
      return draft;
  }
}, initialState); // initialize state

export default achievementsReducer;