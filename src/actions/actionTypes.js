/**
 * @module  src/actions/actionTypes
 * @author  samanthasalley
 * @description exports whitelist of actions to be processed by reducers
 */

export default {
  SIMPLE_ACTION: 'SIMPLE_ACTION',
  // deck actions
  SET_DECK: 'SET_DECK',
  DRAW_CARD: 'DRAW_CARD',
  RETURN_CARD: 'RETURN_CARD',
  // achievement actions
  SET_ACHIEVEMENTS: 'SET_ACHIEVEMENTS',
  CLAIM_ACHIEVEMENT: 'CLAIM_ACHIEVEMENT',
  // player actions
  SET_HANDS: 'SET_HANDS',
  SET_PLAYERS: 'SET_PLAYERS',
  SET_GAME_READY: 'SET_GAME_READY',
  UPDATE_PLAYER_HAND: 'UPDATE_PLAYER_HAND',
};