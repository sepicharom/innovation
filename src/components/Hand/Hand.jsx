import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import * as gameActions from '../../actions/gameActions';

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

// dispatch(gameActions.updatePlayerHand(player, hand)),

const Hand = ({ player, currentPlayer, handsByUsername, cardsById }) => {
  const Cards = handsByUsername[player]
    .filter((cardId) => cardsById[cardId])
    .map((cardId) => <Card key={cardId} {...cardsById[cardId]} />);
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
  currentPlayer: PropTypes.string.isRequired,
  handsByUsername: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, null)(Hand);
