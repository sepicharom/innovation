import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { COLORS } from '../../utils/constants';

import Card from '../CardFront/CardFront';
import Collapse from '../../libs/ui/Collapse/Collapse';

import styled from 'styled-components/macro';

const StyledBoard = styled.div(props => `
  display: grid;
  grid-template-columns: repeat(${props.colors}, 1fr);
  grid-gap: 2rem;
`);

const mapStateToProps = (store) => ({
  cardsById: store.cards.cardsById,
  currentPlayer: store.players.currentPlayer,
  boardsByUsername: store.game.boardsByUsername,
});

const Board = ({ player, currentPlayer, boardsByUsername, cardsById }) => {
  const cardsByColor = COLORS.reduce((playerBoard, color) => {
    const cardsForColor = boardsByUsername[player][color];
    if (cardsForColor.length) {
      playerBoard[color] = cardsForColor
        .filter((cardId) => cardsById[cardId])
        .map((cardId) => <Card key={cardId} {...cardsById[cardId]} />);
    }
    return playerBoard;
  }, {});
  const BoardItems = [];
  COLORS.forEach(color => {
    if (cardsByColor[color]) {
      BoardItems.push(cardsByColor[color])
    }
  });
  return (
    <Collapse
      header="Board"
      content={<StyledBoard colors={BoardItems.length}>{BoardItems}</StyledBoard>}
      shouldDefaultOpen={player === currentPlayer}
    />
  );
};

Board.propTypes = {
  player: PropTypes.string.isRequired,
  currentPlayer: PropTypes.string.isRequired,
  boardsByUsername: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, null)(Board);
