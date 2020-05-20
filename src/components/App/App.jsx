import React from 'react';
import { connect } from 'react-redux';
import * as playerActions from '../../actions/playerActions';

import Game from '../Game/Game';
import StartForm from '../StartForm/StartForm';
import PageWrapper from '../../libs/ui/PageWrapper/PageWrapper';

const mapStateToProps = store => ({
  usernames: store.players.usernames,
});

const mapDispatchToProps = dispatch => ({
  setPlayers: (players) => dispatch(playerActions.setPlayers(players)),
});

const App = ({ usernames, setPlayers }) => {
  const handleStartFormSubmit = values => {
    setPlayers(values.players);
  };

  return (
    <PageWrapper>
      {!usernames.length
        && <StartForm onSubmit={handleStartFormSubmit} />
      }
      {usernames.length > 0
        && <Game />
      }
    </PageWrapper>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);