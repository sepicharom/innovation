import React from 'react';
import { connect } from 'react-redux';
import * as deckActions from '../../actions/deckActions';

import DrawPile from '../DrawPile/DrawPile';
import Group from '../../libs/ui/Group/Group';

const mapStateToProps = store => ({
  cardsByAge: store.deck,
});

const mapDispatchToProps = dispatch => ({
  drawFromAge: (age) => dispatch(deckActions.drawCard(age)),
});

const Deck = ({
  cardsByAge,
  drawFromAge,
}) => {
  const DrawPiles = Object.keys(cardsByAge).map(age => (
    <DrawPile key={`age-${age}-pile`}
      age={age}
      draw={drawFromAge}
      numCardsInPile={cardsByAge[age].length}
    />
  ));
  return (
    <div>
      <h3>Draw Piles</h3>
      <Group theme="horizontal" center>
        {DrawPiles}
      </Group>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Deck);
