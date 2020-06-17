/**
 * @module  Start
 * @author  samanthasalley
 * @description Page rendered at start of game to render StartForm
 */

import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as gameActions from '../../actions/gameActions';

import StartForm from '../StartForm/StartForm';

const mapStateToProps = (store) => ({
  gameId: store.game.gameId,
});

const mapDispatchToProps = (dispatch) => ({
  startGame: (formValues) => dispatch(gameActions.startGame(formValues)),
});

const Start = ({ gameId, startGame }) => {
  if (gameId) return <Redirect to={`/room/${gameId}`} />;
  return (
    <main>
      <StartForm onSubmit={startGame} />
    </main>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Start);
