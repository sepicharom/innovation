/**
 * @module  Start
 * @author  samanthasalley
 * @description Page rendered at start of game to render StartForm
 */

import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as playerActions from '../../actions/playerActions';

import StartForm from '../StartForm/StartForm';

const mapStateToProps = (store) => ({
  gameId: store.players.gameId,
});

const mapDispatchToProps = (dispatch) => ({
  startGame: (formValues) => dispatch(playerActions.startGame(formValues)),
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
