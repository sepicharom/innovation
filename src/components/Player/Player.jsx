import React from 'react';

import Group from '../../libs/ui/Group/Group';

const Player = ({
  name,
  hand,
}) => {
  return (
    <div>
      <h3>{name}</h3>
      <Group theme="horizontal" center>
        {hand}
      </Group>
    </div>
  );
}

export default Player;
