import React from 'react';
import { connect } from 'react-redux';
import * as playerActions from '../../actions/playerActions';

import Game from '../Game/Game';
import StartForm from '../StartForm/StartForm';
import PageWrapper from '../../libs/ui/PageWrapper/PageWrapper';

const STARTING_PLAYER = Object.freeze({
  username: null,
  age: 1,
});

const mapStateToProps = (store) => ({
  usernames: store.players.usernames,
});

const mapDispatchToProps = (dispatch) => ({
  setPlayers: (players) => dispatch(playerActions.setPlayers(players)),
});

const App = ({ usernames, setPlayers }) => {
  const handleStartFormSubmit = (values) => {
    const playersObj = values.players.reduce((obj, username) => {
      const newPlayer = Object.assign({}, STARTING_PLAYER, { username });
      obj[username] = newPlayer;
      return obj;
    }, {});
    setPlayers(playersObj);
  };

  return (
    <PageWrapper>
      {!usernames.length && <StartForm onSubmit={handleStartFormSubmit} />}
      {usernames.length > 0 && <Game />}
    </PageWrapper>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
