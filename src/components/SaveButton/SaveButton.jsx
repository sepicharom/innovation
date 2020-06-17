/**
 * @module  SaveButton
 * @author  samanthasalley
 * @description Button which triggers firebaseFunctions.saveGame
 */

import React, { Fragment, useState } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { saveGame } from '../../utils/firebaseFunctions';

import Button from '../../libs/ui/Button/Button';

const mapStateToProps = (store) => ({
  deck: store.deck,
  gameId: store.game.gameId,
  achievementsByAge: store.achievements,
  hands: store.game.handsByUsername,
  boards: store.game.boardsByUsername,
  players: store.players.playersByUsername,
});

const SaveButton = ({ players, hands, boards, deck, achievementsByAge, gameId }) => {
  const [lastSaved, updateLastSaved] = useState(null);

  const triggerGameSave = async () => {
    try {
      const saveData = {
        deck,
        achievementsByAge,
        players,
        hands,
        boards,
      };
      await saveGame(gameId, saveData, false);
      updateLastSaved(moment());
    }
    catch(err) {
      console.error('triggerGameSave err: ', err);
      throw err;
    }
  };

  return (
    <Fragment>
      <Button theme="primaryOutline" size="sm" onClick={triggerGameSave}>Save Game</Button>
      {lastSaved && <span>Last Saved: {lastSaved.format('MM/DD/YYYY - hh:mm:ss')}</span>}
    </Fragment>
  );
};

export default connect(mapStateToProps, null)(SaveButton);
