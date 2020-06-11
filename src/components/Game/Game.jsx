import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as deckActions from '../../actions/deckActions';
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
  gameId: store.players.gameId,
  gameReady: store.players.gameReady,
  usernames: store.players.usernames,
  playersByUsername: store.players.playersByUsername,
});

const mapDispatchToProps = (dispatch) => ({
  setDeck: (cards) => dispatch(deckActions.setDeck(cards)),
  setGameReady: () => dispatch(playerActions.setGameReady()),
  setGameId: (gameId) => dispatch(playerActions.setGameId(gameId)),
  setPlayers: (players) => dispatch(playerActions.setPlayers(players)),
  setInitialBoards: (boardsByUsername) =>
    dispatch(playerActions.setBoards(boardsByUsername)),
  setInitialHands: (handsByUsername) =>
    dispatch(playerActions.setHands(handsByUsername)),
  setAchievements: (achievementsByAge) =>
    dispatch(achievementActions.setAchievements(achievementsByAge)),
});

const Game = ({
  cardIds,
  cardsById,
  achievements,
  // gameId,
  gameReady,
  usernames,
  playersByUsername,
  setDeck,
  setGameId,
  setPlayers,
  setGameReady,
  setAchievements,
  setInitialHands,
  setInitialBoards,
}) => {
  let { gameId } = useParams();
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
        const players = gameData.players;
        let deck = gameData.deck;
        let achievementsByAge = gameData.achievements;
        let hands = gameData.hands;
        const boards = gameData.boards || null;
        if (!usernames.length && !players) throw new Error('missing players!');
        if (!deck || !achievementsByAge) {
          const starterCards = createStarterDeck(cardsById);
          deck = starterCards.deck;
          achievementsByAge = starterCards.achievementsByAge;
        }
        if (!hands) hands = selectStarterHands(deck[1], usernames);
        if (!usernames.length) {
          setPlayers(players);
          setGameId(gameId);
        }
        if (boards) setInitialBoards(boards);
        setDeck(deck);
        setInitialHands(hands);
        setAchievements(achievementsByAge);
        setGameReady();
      } catch (err) {
        console.error('Game setupGame error: ', err);
        throw err;
      }
    };
    if (cardIds.length) setupGame();
  }, [
    cardIds,
    cardsById,
    gameId,
    gameReady,
    usernames,
    setAchievements,
    setDeck,
    setGameId,
    setPlayers,
    setGameReady,
    setInitialHands,
    setInitialBoards,
  ]);
  // }, [cards, setAchievements, setDeck, setGameReady, setInitialHands, usernames]);

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

export default connect(mapStateToProps, mapDispatchToProps)(Game);
