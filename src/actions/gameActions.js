import actions from './actionTypes';
import {
  createPlayers,
  createStarterDeck,
  selectStarterHands,
} from '../utils/setup';
import { createGame } from '../utils/firebaseFunctions';

export const setGameReady = () => (dispatch) => {
  dispatch({
    type: actions.SET_GAME_READY,
  });
};

export const setGameId = (gameId) => (dispatch) => {
  dispatch({
    type: actions.SET_GAME_ID,
    payload: { gameId },
  });
};

export const setBoards = (boardsByUsername) => (dispatch) => {
  dispatch({
    type: actions.SET_BOARDS,
    payload: { boardsByUsername },
  });
};

export const updatePlayerBoard = (username, newBoard) => (dispatch) => {
  dispatch({
    type: actions.UPDATE_PLAYER_BOARD,
    payload: { username, newBoard },
  });
};

export const setHands = (handsByUsername) => (dispatch) => {
  dispatch({
    type: actions.SET_HANDS,
    payload: { handsByUsername },
  });
};

export const updatePlayerHand = (username, newHand) => (dispatch) => {
  dispatch({
    type: actions.UPDATE_PLAYER_HAND,
    payload: { username, newHand },
  });
};

export const meldCard = (username, color, card) => (dispatch) => {
  dispatch({
    type: actions.MELD_CARD,
    payload: { username, color, card },
  });
};

export const startGame = (gameData) => (dispatch) => {
  dispatch({
    type: actions.START_GAME,
    payload: { ...gameData },
  });
};

export const setupGame = (formValues, cardsById) => async (
  dispatch
) => {
  try {
    const players = createPlayers(formValues.players);
    const gameData = await createGame(players);
    const { deck, achievementsByAge } = createStarterDeck(cardsById);
    const hands = selectStarterHands(deck[1], Object.keys(players));
    dispatch(
      startGame({
        players,
        deck,
        achievementsByAge,
        hands,
        gameId: gameData.id,
      })
    );
  } catch (err) {
    console.error('setupGame err: ', err);
    throw err;
  }
};
