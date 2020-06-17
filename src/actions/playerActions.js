import actions from './actionTypes';

export const setPlayers = (players) => (dispatch) => {
  dispatch({
    type: actions.SET_PLAYERS,
    payload: { players },
  });
};

export const updateCurrentPlayer = (username) => (dispatch) => {
  dispatch({
    type: actions.UPDATE_CURRENT_PLAYER,
    payload: { username },
  });
};

export const playerActionOccurred = () => (dispatch) => {
  dispatch({
    type: actions.PLAYER_ACTION_OCCURRED,
  });
};
