import React from 'react';
import PropTypes from 'prop-types';

import Hand from '../Hand/Hand';

const Player = ({ name }) => {
  return (
    <div>
      <h2>{name}</h2>
      <Hand player={name} />
    </div>
  );
};

Player.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Player;
