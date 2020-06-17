import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as deckActions from '../../actions/deckActions';
import * as gameActions from '../../actions/gameActions';
import { draw as drawCard, determinePlayerDrawPile } from '../../utils/deck';
import { saveGame } from '../../utils/firebaseFunctions';

import DrawPile from '../DrawPile/DrawPile';

import styled from 'styled-components/macro';

const DeckContainer = styled.div`
  border-bottom: 1px solid lightgray;
`;

const PilesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2rem;
`;

const mapStateToProps = (store) => ({
  gameId: store.game.gameId,
  deck: store.deck,
  playersByUsername: store.players.playersByUsername,
  currentPlayer: store.players.currentPlayer,
  handsByUsername: store.game.handsByUsername,
});

const mapDispatchToProps = (dispatch) => ({
  drawFromAge: (age) => dispatch(deckActions.drawCard(age)),
  updatePlayerHand: (username, newHand) =>
    dispatch(gameActions.updatePlayerHand(username, newHand)),
  playerActionOccurred: () => dispatch(gameActions.playerActionOccurred()),
});

const Deck = ({
  gameId,
  deck,
  drawFromAge,
  playersByUsername,
  currentPlayer,
  playerActionOccurred,
  handsByUsername,
  updatePlayerHand,
}) => {
  /** saveGame anytime handsByUsername prop updates */
  useEffect(() => {
    saveGame(gameId, { handsByUsername });
  }, [gameId, handsByUsername]);
  /** saveGame anytime playersByUsername prop updates */
  useEffect(() => {
    saveGame(gameId, { playersByUsername });
  }, [gameId, playersByUsername]);
  /** saveGame anytime deck prop updates */
  useEffect(() => {
    saveGame(gameId, { deck });
  }, [gameId, deck]);
  /**
   * @name drawPileClicked
   * @param {string} age 
   * @description logic to check for drawn card and fire
   *   off action to update player hand and card deck
   */
  const drawPileClicked = (age) => {
    const drawnCard = drawCard(Number(age), deck);
    const newPlayerHand = [...handsByUsername[currentPlayer], drawnCard];
    drawFromAge(age);
    updatePlayerHand(currentPlayer, newPlayerHand);
    playerActionOccurred();
  };
  // set current player, and check which draw pile shoulw be 
  //  active baseed on player age and available cards in age
  const currentPlayerAge = playersByUsername[currentPlayer].age;
  const activeDrawPile = determinePlayerDrawPile(currentPlayerAge, deck);
  // format draw piles to render
  const DrawPiles = Object.keys(deck).map((age) => {
    const ageNum = Number(age);
    return (
      <DrawPile
        key={`age-${age}-pile`}
        age={ageNum}
        draw={drawPileClicked}
        disabled={ageNum !== activeDrawPile}
        numCardsInPile={deck[age].length}
      />
    );
  });
  // ready to render overall deck
  return (
    <DeckContainer>
      <h3>Draw Piles</h3>
      <PilesContainer>{DrawPiles}</PilesContainer>
    </DeckContainer>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Deck);
