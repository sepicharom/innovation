import React from 'react';
import { connect } from 'react-redux';
import * as deckActions from '../../actions/deckActions';
import * as playerActions from '../../actions/playerActions';
import { draw as drawCard } from '../../utils/deck';

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
  cardsByAge: store.deck,
  playersByUsername: store.players.playersByUsername,
  currentPlayer: store.players.currentPlayer,
  handsByUsername: store.players.handsByUsername,
});

const mapDispatchToProps = (dispatch) => ({
  drawFromAge: (age) => dispatch(deckActions.drawCard(age)),
  updatePlayerHand: (username, newHand) => dispatch(playerActions.updatePlayerHand(username, newHand)),
  playerActionOccurred: () => dispatch(playerActions.playerActionOccurred()),
});

const determinePlayerDrawPile = (curPlayerAge, cardsByAge) => {
  return Object.keys(cardsByAge).reduce((activeAge, age) => {
    // need to convert key str to number
    const curCardAge = Number(age);
    // if we've already found active age,
    // or we haven't gotten to the min age of player
    // just return active age
    if (activeAge > -1 || curCardAge < curPlayerAge) return activeAge;
    // if card and player age are same, and pile has values update active age
    if (curCardAge === curPlayerAge && cardsByAge[curCardAge].length)
      return curCardAge;
    // if card is higher than player age and pile has values, update active age
    if (curCardAge > curPlayerAge && cardsByAge[curCardAge].length)
      return curCardAge;
    // otherwise return active age
    return activeAge;
  }, -1);
};

const Deck = ({
  cardsByAge,
  drawFromAge,
  playersByUsername,
  currentPlayer,
  playerActionOccurred,
  handsByUsername,
  updatePlayerHand,
}) => {
  const drawPileClicked = (age) => {
    const drawnCard = drawCard(Number(age), cardsByAge);
    const newPlayerHand = [...handsByUsername[currentPlayer], drawnCard];
    drawFromAge(age);
    updatePlayerHand(currentPlayer, newPlayerHand);
    playerActionOccurred();
  };
  const currentPlayerAge = playersByUsername[currentPlayer].age;
  const activeDrawPile = determinePlayerDrawPile(currentPlayerAge, cardsByAge);
  const DrawPiles = Object.keys(cardsByAge).map((age) => {
    const ageNum = Number(age);
    return (
      <DrawPile
        key={`age-${age}-pile`}
        age={ageNum}
        draw={drawPileClicked}
        disabled={ageNum !== activeDrawPile}
        numCardsInPile={cardsByAge[age].length}
      />
    );
  });
  return (
    <DeckContainer>
      <h3>Draw Piles</h3>
      <PilesContainer>
        {DrawPiles}
      </PilesContainer>
    </DeckContainer>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Deck);
