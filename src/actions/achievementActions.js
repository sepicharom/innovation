import actions from './actionTypes';

export const setAchievements = (achievementsByAge) => dispatch => {
  dispatch({
    type: actions.SET_ACHIEVEMENTS,
    payload: { achievementsByAge },
  })
};

export const claimAchievement = (achievement, isSpecial = false) => dispatch => {
  dispatch({
    type: actions.CLAIM_ACHIEVEMENT,
    payload: { achievement, isSpecial },
  })
};