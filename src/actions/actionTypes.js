/**
 * @module  src/actions/actionTypes
 * @author  samanthasalley
 * @description exports whitelist of actions to be processed by reducers
 */

export default {
  SIMPLE_ACTION: 'SIMPLE_ACTION',
  // game actions
  MELD_CARD: 'MELD_CARD',
  SET_HANDS: 'SET_HANDS',
  SET_BOARDS: 'SET_BOARDS',
  SET_GAME_ID: 'SET_GAME_ID',
  SET_GAME_READY: 'SET_GAME_READY',
  UPDATE_PLAYER_HAND: 'UPDATE_PLAYER_HAND',
  UPDATE_PLAYER_BOARD: 'UPDATE_PLAYER_BOARD',
  // card actions
  SET_CARDS: 'SET_CARDS',
  // deck actions
  SET_DECK: 'SET_DECK',
  DRAW_CARD: 'DRAW_CARD',
  RETURN_CARD: 'RETURN_CARD',
  // achievement actions
  SET_ACHIEVEMENTS: 'SET_ACHIEVEMENTS',
  CLAIM_ACHIEVEMENT: 'CLAIM_ACHIEVEMENT',
  SET_SPECIAL_ACHIEVEMENTS: 'SET_SPECIAL_ACHIEVEMENTS',
  // player actions
  SET_PLAYERS: 'SET_PLAYERS',
  UPDATE_CURRENT_PLAYER: 'UPDATE_CURRENT_PLAYER',
  PLAYER_ACTION_OCCURRED: 'PLAYER_ACTION_OCCURRED',
};