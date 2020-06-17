import actions from './actionTypes';

export const setAchievements = (achievementsByAge) => dispatch => {
  dispatch({
    type: actions.SET_ACHIEVEMENTS,
    payload: { achievementsByAge },
  })
};

export const setSpecialAchievements = (specialAchievements) => dispatch => {
  dispatch({
    type: actions.SET_SPECIAL_ACHIEVEMENTS,
    payload: { specialAchievements },
  })
};

export const claimAchievement = (achievement, isSpecial = false) => dispatch => {
  dispatch({
    type: actions.CLAIM_ACHIEVEMENT,
    payload: { achievement, isSpecial },
  })
};