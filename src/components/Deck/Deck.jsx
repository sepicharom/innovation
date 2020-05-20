import React from 'react';
import { connect } from 'react-redux';
import * as deckActions from '../../actions/deckActions';

import DrawPile from '../DrawPile/DrawPile';
import Group from '../../libs/ui/Group/Group';

const mapStateToProps = (store) => ({
  cardsByAge: store.deck,
  playersByUsername: store.players.playersByUsername,
  currentPlayer: store.players.currentPlayer,
});

const mapDispatchToProps = (dispatch) => ({
  drawFromAge: (age) => dispatch(deckActions.drawCard(age)),
});

const Deck = ({
  cardsByAge,
  drawFromAge,
  playersByUsername,
  currentPlayer,
}) => {
  const currentPlayerAge = playersByUsername[currentPlayer].age;
  const DrawPiles = Object.keys(cardsByAge).map((age) => {
    const ageNum = Number(age);
    return (
      <DrawPile
        key={`age-${age}-pile`}
        age={ageNum}
        draw={drawFromAge}
        disabled={ageNum !== currentPlayerAge}
        numCardsInPile={cardsByAge[age].length}
      />
    );
  });
  return (
    <div>
      <h3>Draw Piles</h3>
      <Group theme="horizontal" center>
        {DrawPiles}
      </Group>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Deck);
