import React from 'react';
import { connect } from 'react-redux';
import * as playerActions from '../../actions/playerActions';

import Card from '../CardFront/CardFront';
import Player from '../Player/Player';

const mapStateToProps = store => ({
  playerData: store.players,
  cards: store.cards.cards,
});

const mapDispatchToProps = dispatch => ({
  updatePlayerHand: (player, hand) => dispatch(playerActions.updatePlayerHand(player, hand)),
});

const Players = ({
  cards,
  playerData: {
    usernames,
    playersByUsername,
    handsByUsername,
  },
}) => {
  const AllPlayers = usernames.map((name, playerIdx) => {
    const playerHand = handsByUsername[name]
      .filter(cardName => cards.find(c => c.name === cardName))
      .map(cardName => (<Card key={cardName} {...cards.find(c => c.name === cardName)} />));
    return (
      <Player 
        key={name}
        name={name}
        hand={playerHand}
        firstPlayer={playerIdx === 0}
      />
    )
  });
  return (
    <div>
      {AllPlayers}
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Players);
