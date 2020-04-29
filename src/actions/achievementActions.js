import actions from './actionTypes';

export const setAchievements = (achievementsByAge) => dispatch => {
  dispatch({
    type: actions.SET_ACHIEVEMENTS,
    payload: { achievementsByAge },
  })
};

export const claimAchievement = (achievementToClaim) => dispatch => {
  dispatch({
    type: actions.CLAIM_ACHIEVEMENT,
    payload: { achievementToClaim },
  })
};