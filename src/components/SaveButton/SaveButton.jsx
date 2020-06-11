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
  playersData: store.players,
  deck: store.deck,
  achievements: store.achievements,
});

const SaveButton = ({ playersData, deck, achievements }) => {
  const [lastSaved, updateLastSaved] = useState(null);

  const triggerGameSave = async () => {
    try {
      const saveData = {
        deck,
        achievements,
        players: playersData.playersByUsername,
        hands: playersData.handsByUsername,
        boards: playersData.boardsByUsername,
      };
      await saveGame(playersData.gameId, saveData, false);
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
