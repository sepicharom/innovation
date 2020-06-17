/**
 * @module  Start
 * @author  samanthasalley
 * @description Page rendered at start of game to render StartForm
 */

import React from 'react';
import { connect } from 'react-redux';
import * as gameActions from '../../actions/gameActions';

import StartForm from '../StartForm/StartForm';

const mapStateToProps = (store) => ({
  gameId: store.game.gameId,
  cardsById: store.cards.cardsById,
});

const Start = ({ dispatch, cardsById }) => {
  const handleSubmit = (formValues) =>
    dispatch(gameActions.setupGame(formValues, cardsById));
  return (
    <main>
      <StartForm onSubmit={handleSubmit} />
    </main>
  );
};

export default connect(mapStateToProps, null)(Start);
