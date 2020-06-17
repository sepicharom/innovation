import React from 'react';
import { connect } from 'react-redux';

import Deck from '../Deck/Deck';
import Players from '../Players/Players';
import Achievements from '../Achievements/Achievements';
// import SaveButton from '../SaveButton/SaveButton';

import styled from 'styled-components/macro';

const GameLayout = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  grid-column-gap: 2rem;
  grid-template-rows: auto;
  grid-template-areas: 'cards players';
`;

const CardsContainer = styled.div`
  grid-area: cards;
`;

const mapStateToProps = (store) => ({
  gameReady: store.game.gameReady,
});

const Game = ({
  gameReady,
}) => {
  if (!gameReady) return null;
  return (
    <GameLayout>
      <CardsContainer>
        {/* <SaveButton /> */}
        <Deck />
        <Achievements />
      </CardsContainer>
      <Players />
    </GameLayout>
  );
};

export default connect(mapStateToProps, null)(Game);
