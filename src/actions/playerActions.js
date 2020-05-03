import actions from './actionTypes';

export const setGameReady = () => dispatch => {
  dispatch({
    type: actions.SET_GAME_READY,
  });
};

export const setPlayers = (players) => dispatch => {
  dispatch({
    type: actions.SET_PLAYERS,
    payload: { players },
  })
};

export const setHands = (handsByUsername) => dispatch => {
  dispatch({
    type: actions.SET_HANDS,
    payload: { handsByUsername },
  })
};

export const updatePlayerHand = (username, newHand) => dispatch => {
  dispatch({
    type: actions.UPDATE_PLAYER_HAND,
    payload: { username, newHand },
  })
};