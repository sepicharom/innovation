import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as gameActions from '../../actions/gameActions';
import * as playerActions from '../../actions/playerActions';

import Card from '../CardFront/CardFront';
import Collapse from '../../libs/ui/Collapse/Collapse';

import styled from 'styled-components/macro';

const StyledHand = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 2rem;
`;

const mapStateToProps = (store) => ({
  cardsById: store.cards.cardsById,
  currentPlayer: store.players.currentPlayer,
  handsByUsername: store.game.handsByUsername,
});

const Hand = ({ player, currentPlayer, handsByUsername, cardsById, dispatch }) => {
  const cardClicked = (cardId) => {
    if (player !== currentPlayer) return;
    const card = cardsById[cardId];
    dispatch(gameActions.meldCard(player, card.color, cardId));
    dispatch(playerActions.playerActionOccurred());
  };
  const Cards = handsByUsername[player]
    .filter((cardId) => cardsById[cardId])
    .map((cardId) => <Card key={cardId} {...cardsById[cardId]} handleClick={() => cardClicked(cardId)} />);
  return (
    <Collapse
      header="Hand"
      content={<StyledHand>{Cards}</StyledHand>}
      shouldDefaultOpen={player === currentPlayer}
    />
  );
};

Hand.propTypes = {
  player: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  cardsById: PropTypes.object.isRequired,
  currentPlayer: PropTypes.string.isRequired,
  handsByUsername: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, null)(Hand);
