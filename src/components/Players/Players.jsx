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
  cards: store.cards.cards,
});

const mapDispatchToProps = (dispatch) => ({
  updatePlayerHand: (player, hand) =>
    dispatch(playerActions.updatePlayerHand(player, hand)),
});

const Players = ({
  cards,
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
      .filter((cardName) => cards.find((c) => c.name === cardName))
      .map((cardName) => (
        <Card key={cardName} {...cards.find((c) => c.name === cardName)} />
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
