/**
 * @module  actions/deckActions
 * @author  samanthasalley
 * @description Action Creators for deck and cards
 */
import actions from './actionTypes';

export const setCards = (cardData) => dispatch => {
  dispatch({
    type: actions.SET_CARDS,
    payload: cardData,
  });
};

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