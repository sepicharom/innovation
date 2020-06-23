import { STARTING_PLAYER, COLORS } from './constants';
import { shuffle } from './deck';

const createDeck = (cards) => {
  return cards.reduce((byAge, card) => {
    if (!byAge[card.age]) byAge[card.age] = [];
    byAge[card.age].push(card.id);
    return byAge;
  }, {});
};

const selectAchievements = (deck) => {
  return Object.keys(deck).reduce((byAge, age) => {
    if (age < 10) byAge[age] = deck[age].pop();
    return byAge;
  }, {});
};

export const createStarterDeck = (cards) => {
  // run shuffle function on card values to create random deck order
  const shuffledCards = shuffle(Object.values(cards));
  // sort shuffled cards into deck obj by card ages
  const sortedDeck = createDeck(shuffledCards);
  // select achievements off the top of each age - except 10
  // NOTE: mutates sortedDeck
  const achievementsByAge = selectAchievements(sortedDeck);
  return {
    deck: sortedDeck,
    achievementsByAge,
  };
};

export const createPlayers = (players) => {
  return players.reduce((obj, player) => {
    const newPlayer = Object.assign({}, STARTING_PLAYER, player);
    obj[player.username] = newPlayer;
    return obj;
  }, {});
};

export const selectStarterHands = (age1Cards, players) => {
  // create starter hands obj and populate with first card
  const starterHands = players.reduce((hands, username) => {
    hands[username] = [age1Cards.pop()];
    return hands;
  }, {});
  // iterate over players again and push second card to starter hands obj
  players.forEach((username) =>
    starterHands[username].push(age1Cards.pop())
  );
  return starterHands;
};

export const createStarterBoards = (players) => {
  const STARTER_BOARD = COLORS.reduce((board, color) => {
    board[color] = [];
    return board;
  }, {});
  const starterBoards = players.reduce((byUsername, username) => {
    byUsername[username] = Object.assign({}, STARTER_BOARD);
    return byUsername;
  }, {});
  return starterBoards;
};
