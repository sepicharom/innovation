import React from 'react';

import Group from '../../libs/ui/Group/Group';
import Collapse from '../../libs/ui/Collapse/Collapse';

const Player = ({
  name,
  hand,
  firstPlayer,
}) => {
  const PlayerHand = (
    <Group theme="horizontal" center>
      {hand}
    </Group>
  );
  return (
    <div>
      <Collapse
        header={name}
        content={PlayerHand}
        shouldDefaultOpen={firstPlayer}
      />
    </div>
  );
}

export default Player;
