import actions from './actionTypes';

export const setDeck = (deck) => dispatch => {
  dispatch({
    type: actions.SET_DECK,
    payload: { deck },
  })
};

export const drawCard = (age) => dispatch => {
  dispatch({
    type: actions.DRAW_CARD,
    payload: { age },
  })
};

export const returnCard = (age, card) => dispatch => {
  dispatch({
    type: actions.RETURN_CARD,
    payload: { age, card },
  })
};