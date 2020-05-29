import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as deckActions from '../../actions/deckActions';
import * as playerActions from '../../actions/playerActions';
import * as achievementActions from '../../actions/achievementActions';
import { shuffle } from '../../utils/shuffle';

import Deck from '../Deck/Deck';
import Players from '../Players/Players';
import Achievements from '../Achievements/Achievements';

import styled from 'styled-components/macro';

const GameLayout = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  grid-column-gap: 2rem;
  grid-template-rows: auto;
  grid-template-areas: 'cards players';
`;

const CardsContainer = styled.div`
  grid-area: cards;
`;

const mapStateToProps = (store) => ({
  ...store.cards,
  achievements: store.achievements,
  gameReady: store.players.gameReady,
  usernames: store.players.usernames,
  playersByUsername: store.players.playersByUsername,
});

const mapDispatchToProps = (dispatch) => ({
  setDeck: (cards) => dispatch(deckActions.setDeck(cards)),
  setGameReady: () => dispatch(playerActions.setGameReady()),
  setInitialHands: (handsByUsername) =>
    dispatch(playerActions.setHands(handsByUsername)),
  setAchievements: (achievementsByAge) =>
    dispatch(achievementActions.setAchievements(achievementsByAge)),
});

const Game = ({
  cards,
  cardNames,
  achievements,
  gameReady,
  usernames,
  playersByUsername,
  setDeck,
  setGameReady,
  setAchievements,
  setInitialHands,
}) => {
  /**
   * sort & shuffle cards
   * pull out age achievements
   * pull out starter hands for players
   * update deck, achievements, and player hands in store
   * @NOTE:
   *    using useEffect here, but may want to switch to
   *    useLayoutEffect if noticing 'flicker' behavior
   *  @see: https://reacttraining.com/blog/useEffect-is-not-the-new-componentDidMount/
   */
  useEffect(() => {
    // run shuffle function on clones cards (so as not to mutate array)
    const shuffledClonedCards = shuffle(cards.map((card) => ({ ...card })));
    // sort shuffled cards into deck obj by card ages
    const sortedDeck = shuffledClonedCards.reduce((byAge, card) => {
      if (!byAge[card.age]) byAge[card.age] = [];
      byAge[card.age].push(card.name);
      return byAge;
    }, {});
    // select achievements off the top of each age - except 10
    const achievementsByAge = Object.keys(sortedDeck).reduce((byAge, age) => {
      if (age < 10) byAge[age] = sortedDeck[age].pop();
      return byAge;
    }, {});
    // select starter hands for players
    const starterHands = usernames.reduce((hands, username) => {
      hands[username] = [sortedDeck[1].pop()];
      return hands;
    }, {});
    usernames.forEach((username) =>
      starterHands[username].push(sortedDeck[1].pop())
    );
    // dispatch actions to set initial game play
    setDeck(sortedDeck);
    setInitialHands(starterHands);
    setAchievements(achievementsByAge);
    setGameReady();
  }, [cards, setAchievements, setDeck, setGameReady, setInitialHands, usernames]);

  if (!gameReady) return null;
  return (
    <GameLayout>
      <CardsContainer>
        <Deck />
        <Achievements />
      </CardsContainer>
      <Players />
    </GameLayout>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
