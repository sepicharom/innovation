import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import * as deckActions from '../../actions/deckActions';
import * as gameActions from '../../actions/gameActions';
import * as playerActions from '../../actions/playerActions';
import * as achievementActions from '../../actions/achievementActions';
import { createStarterDeck, selectStarterHands } from '../../utils/setup';
import { getGame } from '../../utils/firebaseFunctions';

import Deck from '../Deck/Deck';
import Players from '../Players/Players';
import Achievements from '../Achievements/Achievements';
import SaveButton from '../SaveButton/SaveButton';

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

const Game = ({
  cardIds,
  cardsById,
  achievements,
  gameReady,
  usernames,
  playersByUsername,
  dispatch,
}) => {
  let { gameId } = useParams();
  const [redirectToStart, setRedirectToStart] = useState(false);
  console.log('redirectToStart: ', redirectToStart);
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
    const fetchExistingGame = async () => {
      try {
        const gameData = await getGame(gameId);
        return gameData;
      } catch (err) {
        console.error('Game fetchExistingGame error: ', err);
        throw err;
      }
    };
    const setupGame = async () => {
      try {
        const gameData = !usernames.length ? await fetchExistingGame() : {};
        const players = gameData.playersByUsername;
        let deck = gameData.deck;
        let achievementsByAge = gameData.achievementsByAge;
        let hands = gameData.handsByUsername;
        const boards = gameData.boards || null;
        if (!usernames.length && !players) throw new Error('missing players!');
        if (!deck || !achievementsByAge) {
          const starterCards = createStarterDeck(cardsById);
          deck = starterCards.deck;
          achievementsByAge = starterCards.achievementsByAge;
        }
        if (!hands) hands = selectStarterHands(deck[1], usernames);
        if (!usernames.length) {
          dispatch(playerActions.setPlayers(players));
          dispatch(gameActions.setGameId(gameId));
        }
        if (boards) dispatch(gameActions.setBoards(boards));
        dispatch(deckActions.setDeck(deck));
        dispatch(gameActions.setHands(hands));
        dispatch(achievementActions.setAchievements(achievementsByAge));
        dispatch(gameActions.setGameReady());
      } catch (err) {
        console.error('Game setupGame error: ', err);
        setRedirectToStart(true);
      }
    };
    if (cardIds.length && !gameReady) setupGame();
    // if (cardIds.length && !gameReady) {
    //   if (!usernames.length) setupGame();
    //   else 
    // }
  }, [
    cardIds,
    cardsById,
    gameId,
    gameReady,
    usernames,
    dispatch,
    setRedirectToStart,
  ]);

  if (redirectToStart) return <Redirect to="/" />;
  if (!gameReady) return null;
  return (
    <GameLayout>
      <CardsContainer>
        <SaveButton />
        <Deck />
        <Achievements />
      </CardsContainer>
      <Players />
    </GameLayout>
  );
};

export default connect(mapStateToProps, null)(Game);
