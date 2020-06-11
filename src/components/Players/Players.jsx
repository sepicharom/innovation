import React from 'react';
import { connect } from 'react-redux';
import * as playerActions from '../../actions/playerActions';

import Card from '../CardFront/CardFront';
import Player from '../Player/Player';
import Header from '../../libs/ui/Header/Header';
import Paragraph from '../../libs/ui/Paragraph/Paragraph';

import styled from 'styled-components/macro';

const PlayersContainer = styled.div`
  grid-area: players;
`;

const CurrentPlayerStatus = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const mapStateToProps = (store) => ({
  playerData: store.players,
  cardsById: store.cards.cardsById,
});

const mapDispatchToProps = (dispatch) => ({
  updatePlayerHand: (player, hand) =>
    dispatch(playerActions.updatePlayerHand(player, hand)),
});

const Players = ({
  cardsById,
  playerData: {
    usernames,
    playersByUsername,
    handsByUsername,
    currentPlayer,
    actionNumber,
  },
}) => {
  const AllPlayers = usernames.map((name, playerIdx) => {
    const playerHand = handsByUsername[name]
      .filter((cardId) => cardsById[cardId])
      .map((cardId) => (
        <Card key={cardId} {...cardsById[cardId]} />
      ));
    return (
      <Player
        key={name}
        name={name}
        hand={playerHand}
        firstPlayer={playerIdx === 0}
      />
    );
  });
  return (
    <PlayersContainer>
      <CurrentPlayerStatus>
        <Header size="h3" removeMarginBottom>Current Player: {currentPlayer}</Header>
        <Paragraph content={`Player Action: ${actionNumber}`} />
      </CurrentPlayerStatus>
      {AllPlayers}
    </PlayersContainer>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Players);
